
import {
  TRACTOR_ATTACHMENTS,
  TRACTOR_HP_OPTIONS,
} from "../../../constants/service category/land management/tractorOptions";

function EquipmentDetails({ vendor }) {
  const info = vendor?.Info;
  const getLabel = (options, value) => {
    const match = options.find((item) => item.value === value);
    return match ? match.label : value;
  };

  const hpLabel = getLabel(TRACTOR_HP_OPTIONS, info?.hpOfTractor);
  const equipmentLabel = getLabel(TRACTOR_ATTACHMENTS, info?.equipmentInformation);

  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">Product Information</h5>

      <p>Tractor Brand: {info?.brandOfTractor}</p>
      <p>Tractor Model: {info?.modelOfTractor}</p>
      <p>Tractor HP: {hpLabel}</p>
      <p>Equipment Type: {equipmentLabel}</p>
      <p>Variant: {info?.equipmentVariant}</p>
      <p>Description: {info?.equipmentDescription}</p>
    </div>
  );
}

export default EquipmentDetails;
