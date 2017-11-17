INTRODUCTION

City of Toronto Enhanced Centreline (TCL3_CENTRELINE_OD) data comprises City of Toronto Centreline (TCL) medium scale digital mapping data. This includes the street fabric, rivers, highways, shorelines, trails, and utility corridors, all having names attached. The street layer also includes the address ranges of every street segment on both sides of the centreline. The street layer also includes the bikeway type and one-way streets designation.


DATA LIMITATIONS

TCL geography is represented at 2.5 meter or 8 foot positional accuracy. Large-scale representation of TCL data is not suitable for application projects required for utility and parcel mapping. The decisions drawn from this data must be acceptable as per 1:5,000 scale precision. It also should be noted that TCL database consists of mapping data within the jurisdiction of The City of Toronto. Mapping information from surrounding regions of Peel, Durham and York are not included in this database.


LINEAR FEATURE DEFINITION

Highway is designated for fast, long distance travel with restricted access to sustain high speeds. 

Highway Transfer Ramp provides for transfer between road and highway and also between highway and highway. 

Highway under construction/proposed is a roadway not yet open to the public but is classified as a Highway or Highway Transfer Ramp.

Arterial Road is usually under regional jurisdiction and is fed by collector roads and in some cases is connected to other arterial roads or collector roads via Road Ramp. 

Collector Roads is designated mainly for travel to and from arterial roads with some driveway  access. In Metro they are usually under local jurisdiction.

Lanes is designated mainly for City of Toronto laneways and are usually under local jurisdiction.

Local Roads is designated to service driveway access and usually connects to collector roads or other local roads.

Service/Access Road is dedicated to provide access to or within properties such as townhouse complexes, airports etc. 

Road Ramps (major arterial,minor arterial, collector, other) provides for transfer between two roads. 

Road under construction/proposed is a roadway that is not open to the public but is designated for one of arterial, collector, local road or road ramp.

Major Railway is designated for the fast, long distance, inter-provincial movement of cargo or passenger trains. 

Minor Railway is designated for local public transportation and includes above ground rapid transit corridors and subway lines.

River is a major waterway. 

Creek/Tributary is a minor waterway.

Trail is a pedestrian way designated for recreational purposes and can include foot-powered vehicles such as bikes or roller-blades etc. 

Walkway is a designated path primarily for walking.

Hydro Line is an electricity transportation corridor (high voltage).

Major Shoreline is a boundary of a large body of water. E.g. Lake Ontario shoreline. 

Minor Shoreline is a boundary of a small body or water such as a pond or reservoir.

Fore more info: http://www.toronto.ca/transportation/road_class/index.htm



STREET FEATURE CODES

Every linear feature has feature code (FCODE) defined as follow:

201100	Highway
201101	Highway Ramp
201200	Major Arterial Road
201201	Major Arterial Road Ramp
201300	Minor Arterial Road
201301	Minor Arterial Road Ramp
201400	Collector Road
201401	Collector Road Ramp
201500	Local Road
201600	Other Road
201601	Other Ramp
201700	Laneways
201800	Pending
202001	Major Railway
202002	Minor Railway
202003	Railway under construction/proposed
203001	River
203002	Creek/Tributary
204001	Trail
204002	Walkway
205001	Hydro Line
206001	Major Shoreline
206002	Minor Shoreline (Land locked)


STREET TYPE ABBREVIATIONS


TYPE PART OF LINEAR FEATURE NAME	ABBREVIATION
Avenue	Ave
Bridge	Bdge
Boulevard	Blvd
Circle	Crcl
Court		Crt
Circuit	Crct
Cresent	Cres
Close		Cs
Drive		Dr
Expressway	Xwy
Garden	Gdn
Gardens	Gdns
Gate		Gt
Green		Grn
Grove		Grv
Heights	Hts
Highway	Hwy
Hill		Hill
Lane		Lane
Lawn		Lwn
Line		Line
Mews		Mews
Park		Pk
Parkway	Pkwy
Path		Path
Pathway	Ptwy
Place		Pl
Promenade	Prom
Ramp		Ramp
Road		Rd
Roadway	Rdwy
Square	Sq
Street	St
Terrace	Ter
Trail		Trl
View		View
Walk		Walk
Way		Way
Woods		Wds

BIKEWAYS DATA

The Toronto bikeways data is contained in the TYPE_DESC column of the enhanced Toronto Centreline (TCL). 

The information provided has been developed to assist in planning bicycle trips throughout the City.  The designation of a street on the map as a bicycle trail, lane, or on-street route does not necessarily guarantee the safety of cyclists using these facilities.  Cyclists must use these streets with the same caution they would use when riding on similar streets that have not been so designated.  All routes should be evaluated by each individual cyclist based on their level of experience, comfort level cycling in traffic, weather conditions, time of day and any road obstacles whether temporary or permanent, such as construction or pot holes.  This map is not intended as a guide for children.  The City is not responsible for any unforeseeable offences committed by third parties, which may cause hazard to cyclists.


BIKEWAYS TYPE DESCRIPTIONS

Bike lanes are a dedicated space on the road for cyclists where motorists are not allowed to park, stand or drive.

Quiet Street Cycling Routes consist of contra-flow bike lanes and sharrows.

Contra-flow bike lanes allow cyclists to travel in both directions on one-way streets. Only cyclists travelling in the opposite direction of motorized traffic should use the contra-flow bike lane. 

Sharrows are used in shared traffic lanes to indicate the ideal cyclist position in the lane and to remind drivers to share the road. 

Signed routes are designated by bikeway networks signage as preferred routes for cycling, but no physical changes are made to the roadway. Signed routes are typically installed on quiet, residential, local/collector streets. 

Major and Minor multi-use paths are physically separated from motorized traffic by open space or a barrier. These paths are often shared between cyclists, pedestrians and other users such as in-line skaters. Major multi-use paths are usually paved, while minor multi-use paths may be narrow, unpaved, have a rough surface and require walking in some sections. 

Suggested on-street routes are only indicated on the Toronto Cycling Map; no physical changes are made to the roadway, and no bikeway network signage is installed. Suggested on-street routes are typically quite residential streets. 

Park roads are found in City of Toronto Parks and are shared with motorized traffic. Park roads typically have low traffic volumes and speeds.

Informal dirt footpaths have been identified where short gaps exist between bikeway trails.


ONE-WAY STREETS


Street segments in this file identified as one-way with values of 1,-1. The information is found in ONE_WAY_DI and DIR_CODE_D


Fields:
	
	CENTRELINE(GEO_ID) = Unique geographic identifier
      ADDRESS_L = Address Range on the left side of the street
      ADDRESS_R = Address Range on the right side of the street
	LINEAR_N_1(LF_NAME) = Full street name
      LINEAR_NAM(LFN_ID)  = Linear Feature Name Id     
	PARITY_l(OE_FLAG_L) = Even/Odd address numbers on left side of street
	PARITY_R(OE_FLAG_R) = Even/Odd address numbers on right side of street
	FEATURE_1(FCODE_DESC) = description of the street classification
	FEATURE_CO(FCODE) = Street classification
	FROM_INTER and TO_INTERSE(FNODE and TNODE) = from intersection id and to intersection id
	LONUML = Lowest address number for left side of the street segment
	HINUML = Highest address number for left side of the street segment
	LONUMR = Lowest address number for right side of the street segment
	HINUMR = Highest address number for right side of the street segment
	JURISDICTI(JURIS_CODE) = street jurisdiction (ownership)
      TYPE_DESC(CP_TYPE) = Bike ways type description
      ONEWAY_DIR(ONE_WAY_DI) = One-way direction (0, 1, -1)						
      ONEWAY_D_1(DIR_CODE_D) = One-way Direction Code Description	(0 = Two way; 1 = One way, Digitization direction; -1 = One way, Against digitization direction)					
	OBJECTID = System generated unique ID					
	










