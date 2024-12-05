package s20g01.domain;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;
import s20g01.AssignoperationApplication;
import s20g01.domain.PerformanceDeleted;
import s20g01.domain.PerformanceModified;
import s20g01.domain.PerformanceRegistered;

@Entity
@Table(name = "VehiclePerformance_table")
@Data
//<<< DDD / Aggregate Root
public class VehiclePerformance {

    @Id
    private String registrationId;

    private String vehicleNumber;

    private Date registrationDate;

    private String departure;

    private String departureTime;

    @Embedded
    private int accumulatedDistanceBefore;

    private String destination;

    private String arrivalTime;

    @Embedded
    private int accumulatedDistanceAfter;

    private Double drivingDistance;

    @Enumerated(EnumType.STRING)
    private Purpose purpose;

    @Embedded
    private Period period;

    @Enumerated(EnumType.STRING)
    private Test test;

    @PostPersist
    public void onPostPersist() {
        PerformanceRegistered performanceRegistered = new PerformanceRegistered(
            this
        );
        performanceRegistered.publishAfterCommit();

        PerformanceModified performanceModified = new PerformanceModified(this);
        performanceModified.publishAfterCommit();

        PerformanceDeleted performanceDeleted = new PerformanceDeleted(this);
        performanceDeleted.publishAfterCommit();
    }

    @PrePersist
    public void onPrePersist() {}

    @PreUpdate
    public void onPreUpdate() {}

    public static VehiclePerformanceRepository repository() {
        VehiclePerformanceRepository vehiclePerformanceRepository = AssignoperationApplication.applicationContext.getBean(
            VehiclePerformanceRepository.class
        );
        return vehiclePerformanceRepository;
    }

    //<<< Clean Arch / Port Method
    public void registerDrivingLog(
        RegisterDrivingLogCommand registerDrivingLogCommand
    ) {
        //implement business logic here:

        DrivingLogRegistered drivingLogRegistered = new DrivingLogRegistered(
            this
        );
        drivingLogRegistered.publishAfterCommit();
    }
    //>>> Clean Arch / Port Method

}
//>>> DDD / Aggregate Root
