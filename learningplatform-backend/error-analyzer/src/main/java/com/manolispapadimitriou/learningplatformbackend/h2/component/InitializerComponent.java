package com.manolispapadimitriou.learningplatformbackend.h2.component;

import com.manolispapadimitriou.learningplatformbackend.util.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Component
public class InitializerComponent {
    private static final Logger logger = LoggerFactory.getLogger(InitializerComponent.class);

    /**
     * Initializes h2 with tables and data
     */
    public static void h2dbInit() throws SQLException, URISyntaxException, IOException {

        String sqlFile = new String(Files.readAllBytes(Paths.get("./error-analyzer/src/main/resources/schema.sql")));
        String dataFile = new String(Files.readAllBytes(Paths.get("./error-analyzer/src/main/resources/data.sql")));

        Connection con = DriverManager.getConnection(Data.DB_URL, Data.USER, Data.PASSWORD);
        con.prepareStatement(sqlFile).execute();
        con.prepareStatement(dataFile).execute();

        logger.info("H2 database initialization complete.");
    }
}
