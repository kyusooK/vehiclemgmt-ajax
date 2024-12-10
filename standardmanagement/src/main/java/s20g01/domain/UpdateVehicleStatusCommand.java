package s20g01.domain;

import java.time.LocalDate;
import java.util.*;
import lombok.Data;

@Data
public class UpdateVehicleStatusCommand {

    private Long id;
    private VehicleStatus newStatus;
}
