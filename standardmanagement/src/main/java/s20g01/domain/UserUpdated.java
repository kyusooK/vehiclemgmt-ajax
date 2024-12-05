package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

//<<< DDD / Domain Event
@Data
@ToString
public class UserUpdated extends AbstractEvent {

    private Long id;
    private String name;
    private Email email;

    public UserUpdated(User aggregate) {
        super(aggregate);
    }

    public UserUpdated() {
        super();
    }
}
//>>> DDD / Domain Event
