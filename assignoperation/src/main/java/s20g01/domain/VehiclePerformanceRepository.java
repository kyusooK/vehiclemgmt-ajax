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
    collectionResourceRel = "vehiclePerformances",
    path = "vehiclePerformances"
)
public interface VehiclePerformanceRepository
    extends PagingAndSortingRepository<VehiclePerformance, String> {}
