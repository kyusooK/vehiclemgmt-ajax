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
// @RequestMapping(value="/vehiclePerformances")
@Transactional
public class VehiclePerformanceController {

    @Autowired
    VehiclePerformanceRepository vehiclePerformanceRepository;

    @RequestMapping(
        value = "/vehiclePerformances/{id}/registerdrivinglog",
        method = RequestMethod.PUT,
        produces = "application/json;charset=UTF-8"
    )
    public VehiclePerformance registerDrivingLog(
        @PathVariable(value = "id") String id,
        @RequestBody RegisterDrivingLogCommand registerDrivingLogCommand,
        HttpServletRequest request,
        HttpServletResponse response
    ) throws Exception {
        System.out.println(
            "##### /vehiclePerformance/registerDrivingLog  called #####"
        );
        Optional<VehiclePerformance> optionalVehiclePerformance = vehiclePerformanceRepository.findById(
            id
        );

        optionalVehiclePerformance.orElseThrow(() ->
            new Exception("No Entity Found")
        );
        VehiclePerformance vehiclePerformance = optionalVehiclePerformance.get();
        vehiclePerformance.registerDrivingLog(registerDrivingLogCommand);

        vehiclePerformanceRepository.save(vehiclePerformance);
        return vehiclePerformance;
    }
}
//>>> Clean Arch / Inbound Adaptor
