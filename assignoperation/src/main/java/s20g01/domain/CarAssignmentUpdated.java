package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

//<<< DDD / Domain Event
@Data
@ToString
public class CarAssignmentUpdated extends AbstractEvent {

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
    private UsageCategory usageCategory;
    private CarType carType;
    private MainDepartment mainDepartment;
    private OperationSection operationSection;
    private OperationType operationType;
    private IncludeDriver includeDriver;
    private ProgressStage progressStage;
    private Period period;

    public CarAssignmentUpdated(CarAssignment aggregate) {
        super(aggregate);
    }

    public CarAssignmentUpdated() {
        super();
    }
}
//>>> DDD / Domain Event
