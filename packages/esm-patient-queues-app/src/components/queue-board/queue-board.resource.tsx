import { QueueRoomsResponse } from '../../hooks/useQueueRooms';
import useSWR from 'swr';
import { openmrsFetch, restBaseUrl, useSession } from '@openmrs/esm-framework';
import { PatientQueue } from '../../types/patient-queues';

export function usePatientQueuesByParentLocation(status: string) {
  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;

  const locationApiUrl = locationUuid ? `${restBaseUrl}/location/${locationUuid}?v=full` : null;
  const {
    data: queueRoomsData,
    error: queueRoomError,
    isLoading: queueRoomLoading,
  } = useSWR<{
    data: QueueRoomsResponse;
  }>(locationApiUrl, openmrsFetch);

  const parentLocationUuid = queueRoomsData?.data?.parentLocation?.uuid;

  const queueApiUrl = parentLocationUuid
    ? `${restBaseUrl}/patientqueue?status=${status}&parentLocation=${queueRoomsData?.data?.parentLocation?.uuid}`
    : null;

  const {
    data,
    error: patientQueueErrors,
    isLoading: patientQueueLoading,
    mutate,
  } = useSWR<{
    data: { results: Array<PatientQueue> };
  }>(queueApiUrl, openmrsFetch);

  return {
    isLoading: patientQueueLoading || queueRoomLoading,
    isError: patientQueueErrors || queueRoomError,
    patientQueues: data?.data?.results,
    mutate,
  };
}

export function usePatientQueueBoard() {
  const {
    patientQueues: pending,
    isLoading: loadingPending,
    isError: errorPending,
  } = usePatientQueuesByParentLocation('pending');

  const {
    patientQueues: picked,
    isLoading: loadingPicked,
    isError: errorPicked,
  } = usePatientQueuesByParentLocation('picked');

  return {
    isLoading: loadingPending || loadingPicked,
    isError: errorPending || errorPicked,
    pending,
    picked,
  };
}
