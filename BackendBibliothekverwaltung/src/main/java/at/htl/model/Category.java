package at.htl.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@SequenceGenerator(name = "categorykey",initialValue = 10000)
public class Category {

    @Id
    @GeneratedValue(generator = "categorykey")
    private Integer categoryId;

    private String name;

    private String beschreibung;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Book> books;

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }
}
