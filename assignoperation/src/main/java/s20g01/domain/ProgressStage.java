package s20g01.domain;

import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;
import org.springframework.beans.BeanUtils;

public enum ProgressStage {
    All,
    Received,
    Rejected,
    AssignmentCompleted,
    AssignmentCancelled,
}
