function HarvesterProductInfo({ vendor }) {
  const info = vendor?.Info;
  const priceInfo = vendor?.priceInfo || [];

  const equipmentType = info?.equipmentType || info?.harvesterManufacture || "N/A";

  const equipmentModel = info?.equipmentModel || info?.harvesterModel || "N/A";

  const cropTypes = priceInfo.map((item) => item.cropType).join(", ");

  const formatText = (text) => text?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="option-wrapper mb-0">
      <h5 className="normal-heading">Product Information</h5>
      <p>Type of Crop: {formatText(cropTypes)}</p>
      <p>Equipment Type: {formatText(equipmentType)}</p>
      <p>Equipment Model: {equipmentModel}</p>
    </div>
  );
}

export default HarvesterProductInfo;
