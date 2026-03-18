export const CANCEL_REASONS_BY_SERVICE = {
  LAND_MANAGEMENT: [
    "Implement Mismatch",
    "Poor Condition of the tractor",
    "Inexperienced Operator",
    "Dispute over Charges",
    "Vendor’s Assessment of the Work",
  ],

  HARVESTER: [
    "The Machine is Not What I Booked",
    "The Vendor is Demanding More Money",
    "The Harvester is in Very Poor Condition",
    "The Operator is Inexperienced",
    "Dispute Over How to Measure the Area",
  ],

  CATTLE: [
    "The Animal's Health is Poor and misrepresented",
    "The Milk Yield of the Cow is Grossly Exaggerated",
    "The Animal is Not the Same One Shown in the Photos",
    "The Animal has an Aggressive Temperament",
    "No Proper Documents for Transport",
  ],

  EXCAVATION: [
    "The Wrong Type of Machine for Task",
    "The Billing is Not Clear (Hourly Rate vs. Fixed Job)",
    "The Operator is Unskilled or Unwilling",
    "Machine Lacks the Required Attachment",
    "Damage Caused to Farm Property on Entry",
  ],

  ELECTROSTATIC_SPRAYING: [
    'The "Electrostatic" System is Faulty or Disabled',
    "The Sprayer Tank is Contaminated",
    "Incorrect Nozzle and Pressure Configuration for Grapes",
    "Operator is Unskilled in Navigating a Vineyard",
    "Dispute Over Chemical Mixture and Water Volume",
    "Delta Conditions not suitable",
  ],

  LABOUR: [
    "Fewer Laborers Arrived Than Promised",
    "The Contractor is demanding a Higher Rate",
    "Laborers are Unskilled for the Specific Task",
    "Dispute Over Working Hours and Breaks",
    "Contractor is trying to leave a Different Supervisor",
  ],

  TRANSPORTATION: [
    "Vehicle is Not Equipped for Rain or is Unclean",
    "Driver Refuses to Come to the Actual Loading Point",
    "The Vehicle's Condition is Very Poor",
    "Argument Over the Weight of the Consignment",
  ],

  BOREWELL: [
    "Last-Minute Changes and Ambiguity in the Pricing Structure",
    "Bait-and-Switch on the Quality of Pipe and Motor",
    "The Drilling Rig's Condition is Poor and Inadequate",
  ],

  COW_DUNG: [
    "The Quantity Delivered is Less Than Ordered",
    "Poor Quality - Dung is mixed with Garbage and Soil",
    'I ordered "Dry" Dung but received "Wet" Dung',
    "Vendor Demanding Extra Charges for Unloading",
  ],

  POULTRY_WASTE: [
    "The Quantity Delivered is Less Than Ordered",
    "Poor Quality - Poultry Waste is mixed with Garbage and Soil",
    "Vendor Demanding Extra Charges for Unloading",
  ],

  COMPOUND_WALL: [
    "Dispute Over Final Wall Length Measurement",
    "Inferior Quality of Materials Delivered",
    "Hidden Costs - Foundation Work Charged as Extra",
    "Vendor Citing Monsoon Conditions to Demand More Money",
    "No Proper Plan for Curing the Concrete",
  ],

  DRONE_SPRAYING: [
    "Dispute Over the Farm Area Calculation",
    "Weather is Unsuitable, but the Vendor Wants to Spray Anyway",
    "Pilot is inexperienced",
    "Inadequate Equipment (Not Enough Batteries)",
    "Vendor did not arrive on the scheduled time",
  ],

  AUGER: [
    "The Auger Bit is the Wrong Size (Diameter/Depth)",
    "Dispute Over Pricing (Per Hole vs. Per Hour)",
    "The Machine is Not Powerful Enough for the Soil",
    "Operator Refusing to Dig at Marked Locations",
    "No Responsibility for Underground Utility Damage",
  ],
};

export const SERVICE_REASON_KEY_MAP = {
  land_management: "LAND_MANAGEMENT",
  harvester: "HARVESTER",
  cattle: "CATTLE",
  excavation: "EXCAVATION",
  electrostatic: "ELECTROSTATIC_SPRAYING",
  labour: "LABOUR",
  Transportation: "TRANSPORTATION",
  borewell: "BOREWELL",
  cowdung: "COW_DUNG",
  poultryWaste: "POULTRY_WASTE",
  compoundWall: "COMPOUND_WALL",
  drone: "DRONE_SPRAYING",
  auger: "AUGER",
};
