from common.enums import SimpleEnum


class ContractTypeEnum(SimpleEnum):
    CDI = 'CDI'
    CDD = 'CDD'
    FREELANCE = 'FREELANCE'


class WorkTypeEnum(SimpleEnum):
    FULL_TIME = 'FULL_TIME'
    PART_TIME = 'PART_TIME'
    CONSULTATION = 'CONSULTATION'


class WorkTypePlaceEnum(SimpleEnum):
    ON_SITE = 'ON_SITE'
    PART_TIME = 'PART_TIME'
    HYBRID = 'HYBRID'


class EventTypeEnum(SimpleEnum):
    CONFERENCE = 'CONFERENCE'
    BOOTCAMP = 'BOOTCAMP'
    HACKATON = 'HACKATON'
