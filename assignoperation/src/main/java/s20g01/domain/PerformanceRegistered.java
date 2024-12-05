package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

//<<< DDD / Domain Event
@Data
@ToString
public class PerformanceRegistered extends AbstractEvent {

    private String registrationId;
    private String vehicleNumber;
    private int accumulatedDistanceAfter;
    private Double drivingDistance;
    private Purpose purpose;
    private Period period;
    private Date registrationDate;

    public PerformanceRegistered(VehiclePerformance aggregate) {
        super(aggregate);
    }

    public PerformanceRegistered() {
        super();
    }
}
//>>> DDD / Domain Event
