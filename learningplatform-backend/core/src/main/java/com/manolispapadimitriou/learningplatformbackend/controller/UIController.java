package com.manolispapadimitriou.learningplatformbackend.controller;

import com.manolispapadimitriou.learningplatformbackend.dto.CourseDTO;
import com.manolispapadimitriou.learningplatformbackend.dto.SectionDTO;
import com.manolispapadimitriou.learningplatformbackend.entity.Course;
import com.manolispapadimitriou.learningplatformbackend.entity.User;
import com.manolispapadimitriou.learningplatformbackend.model.SectionInformation;
import com.manolispapadimitriou.learningplatformbackend.model.SectionInformationWrapper;
import com.manolispapadimitriou.learningplatformbackend.service.CourseService;
import com.manolispapadimitriou.learningplatformbackend.service.SectionService;
import com.manolispapadimitriou.learningplatformbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UIController {

    private final CourseService courseService;
    private final UserService userService;
    private final SectionService sectionService;


    public UIController(CourseService courseService, UserService userService, SectionService sectionService) {
        this.courseService = courseService;
        this.userService = userService;
        this.sectionService = sectionService;
    }

    @GetMapping("/login")
    public String login(Model model){
        User user = new User();
        model.addAttribute("user", user);
        return "login-form";
    }

    @PostMapping("/userLogin")
    public String userLogin(HttpSession session, @ModelAttribute("user") User user){
        //Check if user is teacher or admin

        //Get the whole object from repository
        User userFromDB = userService.findUser(user.getEmail(),user.getPassword());

        if(userFromDB.getRole() == 0){
            return "redirect:/admin";
        }else if(userFromDB.getRole() == 1){
            session.setAttribute("userId",userFromDB.getId());
            session.setAttribute("role","teacher");
            return "redirect:/teacher";
        }

        return "redirect:/login";
    }

    @GetMapping("/admin")
    public String admin(Model model){

        List<User> students = userService.findByRole(2);
        Map<Integer, List<CourseDTO>> studentCourses = new HashMap<>();

        for(User student : students){
            List<CourseDTO> allCoursesByUser = courseService.findAllCoursesByUser(student.getId());
            studentCourses.put(student.getId(), allCoursesByUser);
        }

        model.addAttribute("allCourses",courseService.getAllCourses());
        model.addAttribute("allTeachers",userService.findByRole(1));
        model.addAttribute("allStudents",students);
        model.addAttribute("allStudentCourses",studentCourses);




        return "admin/admin";
    }

    /*----- TEACHER ENDPOINTS ----- */
    @GetMapping("/teacher")
    public String teacher(Model model){

        return "redirect:/teacherCourses";
    }

    //Presents courses of teacher
    @GetMapping("/teacherCourses")
    public String getTeacherCourses(Model model, HttpServletRequest req){
        Object userId1 = req.getSession().getAttribute("userId");
        model.addAttribute("allCourses",courseService.findAllCoursesByUser((Integer) userId1));

        return "teacher/allTeacherCourses";
    }

    /*----- ADMIN ENDPOINTS ----- */


    /*----- GENERAL USE ENDPOINTS ----- */

    //Update courses name and description
    @GetMapping("/showFormForCourseUpdate")
    public String shoFormForCourseUpdate(@RequestParam("courseId") int courseId, Model model){

        Course course = courseService.findCourseById(courseId);
        model.addAttribute("course", course);

        return "course/add-course-form";
    }

    //Determines if logged user is admin or teacher and redirect to correct homepage
    @GetMapping("/allCoursesHandler")
    public String getAllCoursesHandler(Model model,HttpServletRequest req){
        return determineHomePage(req);
    }

    @GetMapping("/allCourses")
    public String getAllCourses(Model model){

        model.addAttribute("allCourses",courseService.getAllCourses());

        return "course/allCourses";
    }

    @GetMapping("/showFormForAddCourse")
    public String showFormForAddCourse(Model model,HttpServletRequest req){
        Object userId = req.getSession().getAttribute("userId");

        Course course = new Course();
        User user = userService.findById((Integer) userId);

        model.addAttribute("course", course);
        model.addAttribute("user", user);

        return "course/add-course-form";
    }

    @PostMapping("/saveCourse")
    public String saveCourse(@ModelAttribute("course") Course course,HttpServletRequest req){
        //TODO revert it when you add user handling
        Object userId = req.getSession().getAttribute("userId");
        course.setTeacher(userService.findById((Integer) userId));
        courseService.saveCourse(course);

        return determineHomePage(req);
    }

    //Presents course detail
    @GetMapping("/courseDetails")
    public String getCourseDetail(@RequestParam("courseId") int courseId,Model model,HttpServletRequest req){
        List<SectionDTO> allSectionsByCourse = sectionService.findAllSectionsByCourse(courseId);
        //remove statistics
        allSectionsByCourse.remove(1);

        model.addAttribute("course", courseService.findCourseById(courseId));
        model.addAttribute("sections",allSectionsByCourse.subList(0, allSectionsByCourse.size() - 2));
        model.addAttribute("students", userService.findUserByCourse(courseId));

        return "teacher/teacherCourseDetails";
    }

    //Presents course detail
    @GetMapping("/courseSection")
    public String getCourseSectionInformation(@RequestParam("sectionId") int sectionId,Model model,HttpServletRequest req) throws JSONException {

        SectionDTO section= sectionService.getSectionById(sectionId);

        SectionInformationWrapper sectionInformationWrapper = new SectionInformationWrapper();
        sectionInformationWrapper.setSectionName(section.getName());
        //Loop through section information and get from json the title,paragraph,image,video
        JSONArray jsonInformation = new JSONArray();
        try{
            jsonInformation = new JSONObject(section.getInformation()).getJSONArray("details");

        }catch (Exception e){
            jsonInformation = new JSONObject(section.getInformation()).getJSONArray("paragraph");
        }

        List<SectionInformation> sectionInformationList = new ArrayList<>();
        for(int i=0; i < jsonInformation.length(); i++){
            JSONObject data = jsonInformation.getJSONObject(i);
            SectionInformation sectionInformation = new SectionInformation();

            try{
                sectionInformation.setTitle(data.getString("title"));
                try{
                    sectionInformation.setParagraph(data.getString("paragraph"));
                }catch (Exception e){
                    sectionInformation.setParagraph("");
                }
                try{
                    sectionInformation.setImage(data.getString("image"));
                }catch (Exception e){
                    sectionInformation.setImage("");
                }
                try{
                    sectionInformation.setVideo(data.getString("video"));
                }catch (Exception e){
                    sectionInformation.setVideo("");
                }
            }catch (Exception e){
                sectionInformation.setTitle(data.getString("header"));
                sectionInformation.setParagraph(data.getString("context"));
                sectionInformation.setImage("");
                sectionInformation.setVideo("");
            }

            sectionInformationList.add(sectionInformation);

        }

        sectionInformationWrapper.setSectionInformationList(sectionInformationList);


        model.addAttribute("sectionsInformation", sectionInformationWrapper);

        return "teacher/teacherSectionInformation";
    }

    private String determineHomePage(HttpServletRequest req){
        Object role = req.getSession().getAttribute("role");
        if(role.equals("teacher")){
            return "redirect:/teacherCourses";
        }
        return "redirect:/admin";
    }
}
