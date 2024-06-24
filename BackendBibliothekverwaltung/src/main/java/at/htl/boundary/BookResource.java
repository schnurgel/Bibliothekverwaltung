package at.htl.boundary;

import at.htl.model.Book;
import at.htl.repository.BookRepo;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.List;

@Path("/bibliothek")
public class BookResource {

    @Inject
    BookRepo bookRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getallbooks")
    public Response getAllBooks() {
        System.out.println("got into get all books");
        return Response.ok().entity(bookRepository.getAllBooks()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getbook/{id}")
    public Response getBook(@PathParam("id") int idFromBook) {

        return Response.ok().entity(bookRepository.getBook(idFromBook)).build();
    }

    @POST
    @Path("/borrowbook/{id}/{borrowdate}/{returndate}")
    @Transactional
    public Response borrowBook(@PathParam("id") int idFromBook,@PathParam("borrowdate") String borrowdate,@PathParam("returndate") String returndate) {
        try {
            return Response.ok().entity(bookRepository.borrowBook(idFromBook,borrowdate,returndate)).build();
        } catch (Exception e) {
            return Response.status(422).build();
        }
    }

    @POST
    @Path("/returnbook/{id}")
    @Transactional
    public Response returnBook(@PathParam("id") int idFromBook) {
        try {
            return Response.ok().entity(bookRepository.returnBook(idFromBook)).build();
        } catch (Exception e) {
            return Response.status(422).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getallborrows")
    public Response getAllBorrows() {
        System.out.println("got into get all books");
        return Response.ok().entity(bookRepository.getAllBorrows()).build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/getallbooksbyfilter/{filter}")
    public Response getAllBorrows(@PathParam("filter") String filter) {
        System.out.println("got into get all books");
        return Response.ok().entity(bookRepository.getAllBooksByFilter(filter)).build();
    }

    @GET
    @Path("/getmostborrowedbooks/{startDate}/{endDate}")
    public Response getMostBorrowedBooks(@PathParam("startDate") String startDate, @PathParam("endDate") String endDate) {
        LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
        LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
        return bookRepository.getMostBorrowedBooks(start, end);
    }

    @POST
    @Path("/createreview/{id}/{rating}")
    @Transactional
    public Response createReview(@PathParam("id") int idFromBook,@PathParam("rating") int rating) {
        try {
            return Response.ok().entity(bookRepository.createReview(idFromBook,rating)).build();
        } catch (Exception e) {
            return Response.status(422).build();
        }
    }

    @GET
    @Path("/getreview/{id}")
    public Response getReview(@PathParam("id") String id) {
        try {
            return Response.ok().entity(bookRepository.getReview(id)).build();
        } catch (Exception e) {
            return Response.status(422).build();
        }    }
}