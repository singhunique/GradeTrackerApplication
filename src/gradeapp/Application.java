package gradeapp;

import java.util.Scanner;

public class Application {
    public static void main(String[] args) {
        GradeManager manager = new GradeManager();
        manager.loadFromFile();

        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n===== Welcome!! Student Grade Tracking Application =====");
            System.out.println("1. Add Student which you have to add into the data ");
            System.out.println("2. Add Grade");
            System.out.println("3. Show All Students who are added");
            System.out.println("4. Save student record");
            System.out.println("5. Delete student from record");
            System.out.println("6.Edit Student name");
            System.out.println("7. Delete all data");
            System.out.println("0. Exit");
            System.out.print("Choose: ");

            while (!sc.hasNextInt()) {
                System.out.println("Enter a number.");
                sc.next();
            }
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter ID:, such as 1 or 2  ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter name: ");
                    String name = sc.nextLine();
                    manager.addStudent(id, name);
                    break;

                case 2:
                    System.out.print("Enter student ID: ");
                    int sid = sc.nextInt();
                    System.out.print("Enter grade: ");
                    int grade = sc.nextInt();
                    manager.addGrade(sid, grade);
                    break;

                case 3:
                    for (Student s : manager.getAllStudents()) {
                        System.out.println(s);
                    }
                    break;


                case 4:
                    manager.saveToFile();
                    break;
                case 5:
                    System.out.print("Enter the student ID to delete: ");
                    int deleteId = sc.nextInt();
                    manager.deleteStudent(deleteId);
                    break;

                case 6:
                    System.out.print("Enter the student ID : ");
                    int editId = sc.nextInt();
                    sc.nextLine(); // consume leftover newline
                    System.out.print("Enter the new name: ");
                    String newName = sc.nextLine();
                    manager.editStudentName(editId, newName);
                    break;

                case 7:
                    System.out.print("Are you sure you want to delete ALL student data? (yes/no): ");
                    sc.nextLine(); // clear buffer
                    String confirm = sc.nextLine();
                    if (confirm.equalsIgnoreCase("yes")) {
                        manager.clearAllStudents();
                    } else {
                        System.out.println("Cancelled.");
                    }
                    break;

                case 0:
                    manager.saveToFile();
                    System.out.println("Thanks for using my application ");
                    break;

                default:
                    System.out.println("Wrong option.");
            }

        } while (choice != 0);

        sc.close();
    }
}
