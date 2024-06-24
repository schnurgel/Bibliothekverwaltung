package at.htl.repository;

import at.htl.model.Book;
import at.htl.model.Borrow;
import at.htl.model.Review;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class BookRepo {

    @Inject
    EntityManager entityManager;

    @Transactional
    public List<Book> getAllBooks() {
        System.out.printf("i have selected");
        return entityManager.createQuery("SELECT b FROM Book b", Book.class).getResultList();
    }

    public Book getBook(int idFromBook) {
        try {
            return entityManager.createQuery("SELECT b FROM Book b WHERE b.id = :id", Book.class)
                    .setParameter("id", idFromBook)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public Response borrowBook(int idFromBook, String borrowdate, String returndate) {
        Book book = entityManager.find(Book.class,idFromBook);
        try {
            if (book != null) {
                book.setBorrowed(true);

                Borrow borrow = new Borrow();
                borrow.setBook(book);
                borrow.setBorrowDate(borrowdate);
                borrow.setReturnDate(returndate);
                entityManager.persist(borrow);
            }
            return Response.ok("borrowed got setted").build();
        } catch (Exception e) {
            return Response.status(422).entity("set borrow didnt work").build();
        }

    }

    public List<Borrow> getAllBorrows() {
        return entityManager.createQuery("SELECT b FROM Borrow b", Borrow.class).getResultList();

    }

    public Response returnBook(int idFromBook) {
        Book book = entityManager.find(Book.class,idFromBook);
        try {
            book.setBorrowed(false);
            return Response.ok("borrowed got returned").build();
        } catch (Exception e) {
            return Response.status(422).entity("set borrow didnt returned").build();
        }
    }

    //wird eig nicht verwendet
    public List<Book> getAllBooksByFilter(String filter) {
        String query = "SELECT b FROM Book b " +
                "JOIN b.author a " +
                "JOIN b.category c " +
                "WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :filter, '%')) " +
                "OR LOWER(a.vorname) LIKE LOWER(CONCAT('%', :filter, '%')) " +
                "OR LOWER(a.nachname) LIKE LOWER(CONCAT('%', :filter, '%')) " +
                "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :filter, '%'))";

        return /*Response.ok().entity(*/entityManager.createQuery(query, Book.class)
                .setParameter("filter", filter)
                .getResultList()/*).build()*/;
    }

    public Response getMostBorrowedBooks(LocalDate startDate, LocalDate endDate) {
        String queryStr = "SELECT b.book, COUNT(b.borrowId) as borrowCount " +
                "FROM Borrow b WHERE 1=1";
        if (startDate != null) {
            queryStr += " AND b.borrowDate >= :startDate";
        }
        if (endDate != null) {
            queryStr += " AND b.returnDate <= :endDate";
        }
        queryStr += " GROUP BY b.book ORDER BY borrowCount DESC";

        TypedQuery<Object[]> query = entityManager.createQuery(queryStr, Object[].class);
        if (startDate != null) {
            query.setParameter("startDate", startDate.toString());
        }
        if (endDate != null) {
            query.setParameter("endDate", endDate.toString());
        }
        System.out.printf("DAS IST RESULTS "+query.setMaxResults(3).getResultList().toString());
        return Response.ok().entity(query.setMaxResults(3).getResultList()).build();
    }

    public Response createReview(int idFromBook, int rating) {
        Book book = entityManager.find(Book.class,idFromBook);
        try {
            if (book != null) {

                Review review = new Review();
                review.setBook(book);
                review.setStars(rating);
                entityManager.persist(review);
            }
            return Response.ok("review got setted").build();
        } catch (Exception e) {
            return Response.status(422).entity("set review didnt work").build();
        }

    }

    public Response getReview(String bookId) {
        //Book book = entityManager.find(Book.class,bookId);
        String queryStr = "SELECT r.book.buchId, COUNT(r.reviewId), AVG(r.stars) " +
                "FROM Review r WHERE r.book.buchId = :bookId " +
                "GROUP BY r.book.buchId";
        TypedQuery<Object[]> query = entityManager.createQuery(queryStr, Object[].class);
        query.setParameter("bookId", bookId);

        return Response.ok().entity(query.getResultList()).build();
    }
}
