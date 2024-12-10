package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

//<<< DDD / Domain Event
@Data
@ToString
public class VehicleDeleted extends AbstractEvent {

    private Long id;

    public VehicleDeleted(Vehicle aggregate) {
        super(aggregate);
    }

    public VehicleDeleted() {
        super();
    }
}
//>>> DDD / Domain Event
