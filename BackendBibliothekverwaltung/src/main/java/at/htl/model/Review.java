package at.htl.model;

import jakarta.persistence.*;

@Entity
@SequenceGenerator(name = "reviewkey",initialValue = 10000)
public class Review {
    @Id
    @GeneratedValue(generator = "bookkey")
    private Integer reviewId;

    private int stars;

    @ManyToOne
    @JoinColumn(name = "buchId")
    private Book book;

    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }
}
