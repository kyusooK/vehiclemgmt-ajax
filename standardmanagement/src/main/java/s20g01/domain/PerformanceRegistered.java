package s20g01.domain;

import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

@Data
@ToString
public class PerformanceRegistered extends AbstractEvent {

    private String registrationId;
    private String vehicleNumber;
    private Object accumulatedDistanceAfter;
    private Double drivingDistance;
    private Object purpose;
    private Object period;
    private Date registrationDate;
}
