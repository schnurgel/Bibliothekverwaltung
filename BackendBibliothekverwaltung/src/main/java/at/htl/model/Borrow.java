package at.htl.model;

import jakarta.persistence.*;

@Entity
@SequenceGenerator(name = "bookkey",initialValue = 10000)
public class Borrow {

    @Id
    @GeneratedValue(generator = "bookkey")
    private Integer borrowId;

    private String borrowDate;
    private String returnDate;

    @ManyToOne
    @JoinColumn(name = "buchId")
    private Book book;

    public Integer getBorrowId() {
        return borrowId;
    }

    public void setBorrowId(Integer borrowId) {
        this.borrowId = borrowId;
    }

    public String getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(String borrowDate) {
        this.borrowDate = borrowDate;
    }

    public String getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(String returnDate) {
        this.returnDate = returnDate;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
