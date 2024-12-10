package s20g01.domain;

import java.util.Date;
import lombok.Data;

@Data
public class GetCarAssignmentQuery {

    private String requesterName;
    private String employeeNumber;
    private String approverPosition;
}
