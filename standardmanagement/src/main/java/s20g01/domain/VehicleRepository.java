package s20g01.domain;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import s20g01.domain.*;

//<<< PoEAA / Repository
@RepositoryRestResource(collectionResourceRel = "vehicles", path = "vehicles")
public interface VehicleRepository
    extends PagingAndSortingRepository<Vehicle, Long> {}
