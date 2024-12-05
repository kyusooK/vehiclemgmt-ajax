package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.*;
import s20g01.domain.*;
import s20g01.infra.AbstractEvent;

//<<< DDD / Domain Event
@Data
@ToString
public class UserCreated extends AbstractEvent {

    private Long id;
    private String name;
    private Email email;

    public UserCreated(User aggregate) {
        super(aggregate);
    }

    public UserCreated() {
        super();
    }
}
//>>> DDD / Domain Event
