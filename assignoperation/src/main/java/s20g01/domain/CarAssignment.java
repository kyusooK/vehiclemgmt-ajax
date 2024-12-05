package s20g01.domain;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;
import s20g01.AssignoperationApplication;
import s20g01.domain.CarAssignmentCancelled;
import s20g01.domain.CarAssignmentRequested;
import s20g01.domain.CarAssignmentUpdated;

@Entity
@Table(name = "CarAssignment_table")
@Data
//<<< DDD / Aggregate Root
public class CarAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String requesterName;

    private String organization;

    private String employeeNumber;

    private String officeNumber;

    private String mobileNumber;

    private Date requestDate;

    private String approverInfo;

    private String approverPosition;

    private String usagePurpose;

    private String numberOfPassengers;

    private String routeSetting;

    private String remarks;

    private String passengerContact;

    private String attachedDocuments;

    private String cancellationReason;

    @Enumerated(EnumType.STRING)
    private UsageCategory usageCategory;

    @Enumerated(EnumType.STRING)
    private CarType carType;

    @Enumerated(EnumType.STRING)
    private MainDepartment mainDepartment;

    @Enumerated(EnumType.STRING)
    private OperationSection operationSection;

    @Enumerated(EnumType.STRING)
    private OperationType operationType;

    @Enumerated(EnumType.STRING)
    private IncludeDriver includeDriver;

    @Enumerated(EnumType.STRING)
    private ProgressStage progressStage;

    @Embedded
    private Period period;

    @PostPersist
    public void onPostPersist() {
        CarAssignmentRequested carAssignmentRequested = new CarAssignmentRequested(
            this
        );
        carAssignmentRequested.publishAfterCommit();

        CarAssignmentCancelled carAssignmentCancelled = new CarAssignmentCancelled(
            this
        );
        carAssignmentCancelled.publishAfterCommit();

        CarAssignmentUpdated carAssignmentUpdated = new CarAssignmentUpdated(
            this
        );
        carAssignmentUpdated.publishAfterCommit();
    }

    @PrePersist
    public void onPrePersist() {}

    @PreUpdate
    public void onPreUpdate() {}

    @PreRemove
    public void onPreRemove() {}

    public static CarAssignmentRepository repository() {
        CarAssignmentRepository carAssignmentRepository = AssignoperationApplication.applicationContext.getBean(
            CarAssignmentRepository.class
        );
        return carAssignmentRepository;
    }
}
//>>> DDD / Aggregate Root
