import VegetableFields from "./VegetableFields";
import CattleFields from "./CattleFields";
import EquipmentFields from "./EquipmentFields";
import OtherFields from "./OtherFields";

export default function TransportItemFields(props) {
  const { transportItem } = props;

  if (transportItem === "vegitable") return <VegetableFields {...props} />;
  if (transportItem === "cattle") return <CattleFields {...props} />;
  if (transportItem === "equipment") return <EquipmentFields {...props} />;
  if (transportItem === "other") return <OtherFields {...props} />;

  return null;
}
