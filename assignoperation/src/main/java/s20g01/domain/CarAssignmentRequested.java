package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

//<<< DDD / Domain Event
@Data
@ToString
public class CarAssignmentRequested extends AbstractEvent {

    private String requesterName;
    private String organization;
    private String employeeNumber;
    private String officeNumber;
    private String mobileNumber;
    private String requestDate;
    private String approverInfo;
    private String approverPosition;
    private String usageCategory;
    private String usagePurpose;
    private String operationSection;
    private String mainDepartment;
    private String numberOfPassengers;
    private String carType;
    private String operationPeriod;
    private String includeDriver;
    private String routeSetting;
    private String remarks;
    private String passengerContact;
    private String attachedDocuments;

    public CarAssignmentRequested(CarAssignment aggregate) {
        super(aggregate);
    }

    public CarAssignmentRequested() {
        super();
    }
}
//>>> DDD / Domain Event
