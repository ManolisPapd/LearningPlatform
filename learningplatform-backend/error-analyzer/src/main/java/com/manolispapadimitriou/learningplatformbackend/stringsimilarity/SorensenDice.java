package com.manolispapadimitriou.learningplatformbackend.stringsimilarity;

import java.util.*;
import java.util.regex.Pattern;

public class SorensenDice {

    private static final int K = 3;


    /**
     * Sørensen-Dice coefficient
     * Calculating k-shingling for each comparator
     * Similarity is calculated by the expression : 2 * intersectionSize / (first comparator size + second comparator size)
     * Distance is calculated by the expression : 1 - similarity
     * @param firstComparator
     * @param secondComparator
     * @return
     */
    public static final Double similarity(final String firstComparator, final String secondComparator){

        if(isNull(firstComparator, secondComparator)){
            throw new NullPointerException("Comparators must not be null");
        }


        //1. Get k-shingles for each comparator
        Map<String, Integer> firstApproximate = getApproximate(firstComparator);
        Map<String, Integer> secondApproximate = getApproximate(secondComparator);

        //2.
        Set<String> union = new HashSet<>();
        union.addAll(firstApproximate.keySet());
        union.addAll(secondApproximate.keySet());

        int intersectionSize = 0;

        for (String key : union) {
            if (firstApproximate.containsKey(key) && secondApproximate.containsKey(key)) {
                intersectionSize++;
            }
        }

        return 2.0 * intersectionSize / (firstApproximate.size() + secondApproximate.size());
    }

    /**
     * Based on Esko Ukkonen https://www.cs.helsinki.fi/u/ukkonen/TCS92.pdf
     * Exports k-shingles tokens, which is a unique sequence of consecutive K words
     * k-shingling is any k characters that appear consecutively in a document
     * k = 3 because it fits the size of queries. For other languages with more writing we would increase the value of k
     * @param comparator
     * @return
     */
    public static final Map<String, Integer> getApproximate(final String comparator) {
        HashMap<String, Integer> shingles = new HashMap<>();

        String formattedComparator = Pattern.compile("\\s+").matcher(comparator).replaceAll(" ");
        for (int i = 0; i < (formattedComparator.length() - K + 1); i++) {
            shingles.put(formattedComparator.substring(i, i + K), 1);
        }

        return Collections.unmodifiableMap(shingles);
    }

    private static boolean isNull(Object... args){
        for(Object arg: args){
            if(arg==null) return true;
        }
        return false;
    }
}
