package gradeapp;

import java.util.ArrayList;
public class Student {
    private int id;
    private String name;
    private ArrayList<Integer> grades;

    public Student(int id, String name) {
        this.id = id;
        this.name = name;
        this.grades = new ArrayList<>();
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public void setName(String newName) {
        this.name = newName;
    }

    public ArrayList<Integer> getGrades() { return grades; }

    public void addGrade(int grade) {
        grades.add(grade);
    }

    public double getAverage() {
        if (grades.isEmpty()) return 0;
        int sum = 0;
        for (int g : grades) sum += g;
        return sum / (double) grades.size();
    }

    public String getStatus() {
        return getAverage() >= 50 ? " STUDENT IS PASS" : "STUDENT IS FAIL";
    }

    @Override
    public String toString() {
        return id + " - " + name + " | Grades: " + grades +
                " | Avg: " + String.format("%.2f", getAverage()) +
                " | " + getStatus();
    }
}
