package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

//<<< DDD / Domain Event
@Data
@ToString
public class VehicleDetailsUpdated extends AbstractEvent {

    private Long id;
    private String registrationNumber;
    private String make;
    private String model;
    private Integer year;

    public VehicleDetailsUpdated(Vehicle aggregate) {
        super(aggregate);
    }

    public VehicleDetailsUpdated() {
        super();
    }
}
//>>> DDD / Domain Event
