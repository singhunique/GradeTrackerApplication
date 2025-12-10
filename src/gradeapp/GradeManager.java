package gradeapp;

import java.io.*;
import java.util.ArrayList;

public class GradeManager {
    private ArrayList<Student> students = new ArrayList<>();

    public void addStudent(int id, String name) {
        if (findStudent(id) != null) {
            System.out.println("Student with this ID already exists, Please recheck with your records");
            return;
        }
        students.add(new Student(id, name));
        System.out.println("Student added Succesfully");
    }

    public Student findStudent(int id) {
        for (Student s : students) {
            if (s.getId() == id) return s;
        }
        return null;
    }

    public ArrayList<Student> getAllStudents() {
        return students;
    }

    public void addGrade(int id, int grade) {
        Student s = findStudent(id);
        if (s != null) {
            if (grade < 0 || grade > 100) {
                System.out.println("Grade must be between 0 and 100.");
                return;
            }
            s.addGrade(grade);
            System.out.println("Grade added.");
        } else {
            System.out.println("Student not found.");
        }
    }

    public void saveToFile() {
        try (PrintWriter pw = new PrintWriter(new FileWriter("students.txt"))) {
            for (Student s : students) {
                StringBuilder sb = new StringBuilder();
                sb.append(s.getId()).append(",").append(s.getName()).append(",");
                ArrayList<Integer> g = s.getGrades();
                for (int i = 0; i < g.size(); i++) {
                    sb.append(g.get(i));
                    if (i < g.size() - 1) sb.append(";");
                }
                pw.println(sb.toString());
            }
            System.out.println("Saved successfully.");
        } catch (Exception e) {
            System.out.println("Error saving: " + e.getMessage());
        }
    }
    public void deleteStudent(int id) {
        Student s = findStudent(id);
        if (s != null) {
            students.remove(s);
            System.out.println("Student removed.");
        } else {
            System.out.println("Student not found.");
        }
    }
    public void editStudentName(int id, String newName) {
        Student s = findStudent(id);
        if (s != null) {
            s.setName(newName);
            System.out.println("Name updated.");
        } else {
            System.out.println("Student not found.");
        }
    }
    public void clearAll() {
        students.clear();
        System.out.println("All data cleared.");
    }

    public void loadFromFile() {
        students.clear();
        File f = new File("students.txt");
        if (!f.exists()) return;

        try (BufferedReader br = new BufferedReader(new FileReader(f))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",", 3);
                if (parts.length < 2) continue;

                int id = Integer.parseInt(parts[0]);
                String name = parts[1];
                Student s = new Student(id, name);

                if (parts.length == 3 && !parts[2].isEmpty()) {
                    String[] grades = parts[2].split(";");
                    for (String g : grades) {
                        try { s.addGrade(Integer.parseInt(g)); }
                        catch (Exception ignored) {}
                    }
                }
                students.add(s);
            }
            System.out.println("Loaded successfully.");
        } catch (Exception e) {
            System.out.println("Error loading: " + e.getMessage());
        }
    }

    public void clearAllStudents() {
    }
}
