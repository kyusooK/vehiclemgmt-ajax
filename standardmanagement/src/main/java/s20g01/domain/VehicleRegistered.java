package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

//<<< DDD / Domain Event
@Data
@ToString
public class VehicleRegistered extends AbstractEvent {

    private Long id;
    private String registrationNumber;
    private String make;
    private String model;
    private Integer year;
    private VehicleStatus status;

    public VehicleRegistered(Vehicle aggregate) {
        super(aggregate);
    }

    public VehicleRegistered() {
        super();
    }
}
//>>> DDD / Domain Event
