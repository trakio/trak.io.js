define [
  'exception',
  'exceptions/data_object_invalid_json',
  'exceptions/duplicated_distinct_ids',
  'exceptions/internal_service_error',
  'exceptions/invalid_token',
  'exceptions/missing_parameter',
  'exceptions/person_not_found',
  'exceptions/properties_object_invalid',
  'exceptions/revenue_property_invalid',
  'exceptions/route_not_found',
  'exceptions/timeout',
  'exceptions/trial_expired',
  'exceptions/unknown'
], (
  Exception,
  DataObjectInvalidJson,
  DuplicatedDistinctIds,
  InternalServiceError,
  InvalidToken,
  MissingParameter,
  PersonNotFound,
  PropertiesObjectInvalid,
  RevenuePropertyInvalid,
  RouteNotFound,
  Timeout,
  TrialExpired,
  Unknown
) ->

  return {
    Exception: Exception,
    DataObjectInvalidJson: DataObjectInvalidJson,
    DuplicatedDistinctIds: DuplicatedDistinctIds,
    InternalServiceError: InternalServiceError,
    InvalidToken: InvalidToken,
    MissingParameter: MissingParameter,
    PersonNotFound: PersonNotFound,
    PropertiesObjectInvalid: PropertiesObjectInvalid,
    RevenuePropertyInvalid: RevenuePropertyInvalid,
    RouteNotFound: RouteNotFound,
    Timeout: Timeout,
    TrialExpired: TrialExpired,
    Unknown: Unknown
  }
