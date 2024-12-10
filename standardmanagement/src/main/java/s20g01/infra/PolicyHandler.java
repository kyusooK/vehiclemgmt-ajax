package s20g01.infra;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.naming.NameParser;
import javax.naming.NameParser;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import s20g01.config.kafka.KafkaProcessor;
import s20g01.domain.*;

//<<< Clean Arch / Inbound Adaptor
@Service
@Transactional
public class PolicyHandler {

    @Autowired
    UserRepository userRepository;

    @Autowired
    VehicleRepository vehicleRepository;

    @StreamListener(KafkaProcessor.INPUT)
    public void whatever(@Payload String eventString) {}

    @StreamListener(
        value = KafkaProcessor.INPUT,
        condition = "headers['type']=='PerformanceRegistered'"
    )
    public void wheneverPerformanceRegistered_누적거리계산(
        @Payload PerformanceRegistered performanceRegistered
    ) {
        PerformanceRegistered event = performanceRegistered;
        System.out.println(
            "\n\n##### listener 누적거리계산 : " +
            performanceRegistered +
            "\n\n"
        );

        // Comments //
        //운행 km는 운행 후 누적km 에서 운행 전 누적 km를 subtract 한 값이 output 되어야 해.

        // Sample Logic //
        Vehicle.누적거리계산(event);
    }
}
//>>> Clean Arch / Inbound Adaptor
