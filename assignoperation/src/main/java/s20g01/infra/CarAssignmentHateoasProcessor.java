package s20g01.infra;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.stereotype.Component;
import s20g01.domain.*;

@Component
public class CarAssignmentHateoasProcessor
    implements RepresentationModelProcessor<EntityModel<CarAssignment>> {

    @Override
    public EntityModel<CarAssignment> process(
        EntityModel<CarAssignment> model
    ) {
        return model;
    }
}
