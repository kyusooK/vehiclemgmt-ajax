package s20g01.infra;

import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import s20g01.domain.*;

//<<< Clean Arch / Inbound Adaptor

@RestController
// @RequestMapping(value="/vehicles")
@Transactional
public class VehicleController {

    @Autowired
    VehicleRepository vehicleRepository;

    @RequestMapping(
        value = "/vehicles/{id}/updatevehiclestatus",
        method = RequestMethod.PUT,
        produces = "application/json;charset=UTF-8"
    )
    public Vehicle updateVehicleStatus(
        @PathVariable(value = "id") Long id,
        @RequestBody UpdateVehicleStatusCommand updateVehicleStatusCommand,
        HttpServletRequest request,
        HttpServletResponse response
    ) throws Exception {
        System.out.println("##### /vehicle/updateVehicleStatus  called #####");
        Optional<Vehicle> optionalVehicle = vehicleRepository.findById(id);

        optionalVehicle.orElseThrow(() -> new Exception("No Entity Found"));
        Vehicle vehicle = optionalVehicle.get();
        vehicle.updateVehicleStatus(updateVehicleStatusCommand);

        vehicleRepository.save(vehicle);
        return vehicle;
    }
}
//>>> Clean Arch / Inbound Adaptor
