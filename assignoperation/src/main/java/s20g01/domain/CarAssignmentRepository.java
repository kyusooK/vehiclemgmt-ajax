package s20g01.domain;

import java.util.Date;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import s20g01.domain.*;

//<<< PoEAA / Repository
@RepositoryRestResource(
    collectionResourceRel = "carAssignments",
    path = "carAssignments"
)
public interface CarAssignmentRepository
    extends PagingAndSortingRepository<CarAssignment, Long> {
    @Query(
        value = "select carAssignment " +
        "from CarAssignment carAssignment " +
        "where(:requesterName is null or carAssignment.requesterName like %:requesterName%) and (:employeeNumber is null or carAssignment.employeeNumber like %:employeeNumber%) and (:approverPosition is null or carAssignment.approverPosition like %:approverPosition%)"
    )
    List<CarAssignment> getCarAssignment(
        String requesterName,
        String employeeNumber,
        String approverPosition,
        Pageable pageable
    );
}
