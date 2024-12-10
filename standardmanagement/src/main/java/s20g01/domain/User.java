package s20g01.domain;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;
import s20g01.StandardmanagementApplication;
import s20g01.domain.UserCreated;
import s20g01.domain.UserDeleted;
import s20g01.domain.UserUpdated;

@Entity
@Table(name = "User_table")
@Data
//<<< DDD / Aggregate Root
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String email;

    @PostPersist
    public void onPostPersist() {
        UserCreated userCreated = new UserCreated(this);
        userCreated.publishAfterCommit();

        UserDeleted userDeleted = new UserDeleted(this);
        userDeleted.publishAfterCommit();
    }

    @PrePersist
    public void onPrePersist() {}

    @PreUpdate
    public void onPreUpdate() {
        UserUpdated userUpdated = new UserUpdated(this);
        userUpdated.publishAfterCommit();
    }

    public static UserRepository repository() {
        UserRepository userRepository = StandardmanagementApplication.applicationContext.getBean(
            UserRepository.class
        );
        return userRepository;
    }
}
//>>> DDD / Aggregate Root
