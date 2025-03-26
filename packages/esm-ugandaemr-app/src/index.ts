import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { moduleName } from './constants';
import { registerCustomDataSource, registerExpressionHelper } from '@openmrs/openmrs-form-engine-lib';

import formBuilderAppMenu from './menu-app-items/form-builder-app-item/form-builder-app-item.component';
import systemInfoAppMenu from './menu-app-items/system-info-app-item/system-info-app-item.component';
import legacyAdminAppMenu from './menu-app-items/legacy-admin-item/legacy-admin-item.component';
import cohortBuilderAppMenu from './menu-app-items/cohort-builder-item/cohort-builder-item.component';
import formRenderTestAppMenu from './menu-app-items/form-render-test-item/form-render-test-item.component';
import dispensingAppMenu from './menu-app-items/despensing-app-menu-item/dispensing-app-menu-item.component';

import AppSearchLaunchComponent from './app-menu/app-search-icon/app-search-icon.component';

import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { createHomeDashboardLink } from './create-dashboard-link';
import ClinicalPatientSummary from './pages/clinical-patient-summary/clinical-patient-summary.component';
import ClinicalPatientSummaryTabs from './pages/clinical-patient-summary/clinical-patient-summary-tabs/clinical-patient-summary-tabs.component';
import SubjectiveFindingsComponent from './pages/clinical-patient-summary/clinical-patient-summary-tabs/subjective-findings.component';
import ObjectiveFindingsComponent from './pages/clinical-patient-summary/clinical-patient-summary-tabs/objective-findings.component';
import TreatmentPlanComponent from './pages/clinical-patient-summary/clinical-patient-summary-tabs/treatment-plan.component';
import AssessmentComponent from './pages/clinical-patient-summary/clinical-patient-summary-tabs/assessment.component';
import {
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
} from '@ohri/openmrs-esm-ohri-commons-lib';

import {
  CalcMonthsOnART,
  DSDMCategorizationDatasource,
  latestObs,
  patientDSDM,
} from './custom-expressions/custom-expressions';

import {
  drtbSummaryDashboardMeta,
  dstbSummaryDashboardMeta,
  eidDashboardMeta,
  eidSummaryDashboardMeta,
  familyTrackingDashboardMeta,
  generalCounsellingDashboardMeta,
  hivCareAndTreatmentDashboardDMeta,
  hivPrevetionServicesboardDMeta,
  htsDashboardMeta,
  patientSummaryDashboardMeta,
  patientTransfersDashboardMeta,
  tbDashboardMeta,
  treatmentDashboardMeta,
  treatmentRegimenDashboardMeta,
  vmmcDashboardMeta,
} from './dashboard.meta';
import GeneralCounsellingSummary from './views/hiv/hct/general-counselling/general-counselling-summary.component';
import TreatmentRegimen from './views/hiv/hct/treatment-regimen/treatment-regimen.component';
import FamilyTrackingSummary from './views/hiv/hct/family-tracking/family-tracking-summary.component';
import PatientTransfersSummary from './views/hiv/hct/patient-transfers/patient-transfers-summary.component';
import PatientSummaryOverviewList from './views/hiv/hct/patient-summary/patient-summary-summary.component';
import TreatmentSummary from './views/hiv/hct/treatment/treatment-summary.component';
import HivTestingServices from './views/hiv/hps/hts/hiv-testing-services.component';
import VmmcServices from './views/hiv/hps/vmmc/vmmc-services.component';
import DSTBSummary from './views/tb/ds/ds-tb-summary.component';
import DRTBSummary from './views/tb/dr/dr-tb-summary.component';
import EidSummary from './views/eid/eid.component';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const options = {
  featureName: 'esm-ugandaemr-app',
  moduleName,
};

// Menu App Items
export const formBuilderAppMenuItem = getSyncLifecycle(formBuilderAppMenu, options);
export const systemInfoAppMenuItem = getSyncLifecycle(systemInfoAppMenu, options);
export const legacyAdminAppMenuItem = getSyncLifecycle(legacyAdminAppMenu, options);
export const cohortBuilderAppMenuItem = getSyncLifecycle(cohortBuilderAppMenu, options);
export const formRenderTestAppMenuItem = getSyncLifecycle(formRenderTestAppMenu, options);
export const dispensingAppMenuItem = getSyncLifecycle(dispensingAppMenu, options);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
  registerExpressionHelper('cusGetLatestObs', latestObs);
  registerExpressionHelper('getPatientDSMD', patientDSDM);
  registerExpressionHelper('CustomMonthsOnARTCalc', CalcMonthsOnART);

  registerCustomDataSource({
    name: 'dsdm_categorization_datasource',
    load: () => {
      return Promise.resolve({
        default: new DSDMCategorizationDatasource(),
      });
    },
  });
}

export const systemInfoPage = getAsyncLifecycle(() => import('./pages/system-info/system-info.component'), {
  featureName: 'system info page',
  moduleName,
});

export const retrieveFacilityCodeModal = getAsyncLifecycle(
  () => import('./pages/system-info/facility-modal.component'),
  {
    featureName: 'retrieve facility code modal',
    moduleName,
  },
);

export const updateFacilityCodeAlert = getAsyncLifecycle(
  () => import('./pages/system-info/update-facility-code-alert'),
  {
    featureName: 'update facility code alert',
    moduleName,
  },
);

export const dispensingDashboardLink = getSyncLifecycle(
  createHomeDashboardLink({
    name: 'dispensing',
    slot: 'dispensing-dashboard-slot',
    title: 'Pharmacy',
    customSpaBasePath: `${window.spaBase}`,
  }),
  options,
);

export const clinicalPatientDashboardLink = getSyncLifecycle(
  createDashboardLink({
    path: 'clinical-patient-dashboard',
    title: 'Clinical Patient Dashboard',
    icon: '',
    moduleName,
  }),
  options,
);

// Patient Chart

export const clinicalViewsDivider = getSyncLifecycle(
  createOHRIPatientChartSideNavLink(patientChartDivider_dashboardMeta),
  options,
);

export const patientChartHIVCareAndTreatmentDashboard = getSyncLifecycle(
  createDashboardGroup(hivCareAndTreatmentDashboardDMeta),
  options,
);
export const patientChartHIVPreventionServicesDashboard = getSyncLifecycle(
  createDashboardGroup(hivPrevetionServicesboardDMeta),
  options,
);

export const patientChartEIDDashboard = getSyncLifecycle(createDashboardGroup(eidDashboardMeta), options);
export const patientChartTBDashboard = getSyncLifecycle(createDashboardGroup(tbDashboardMeta), options);

export const generalCounsellingDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...generalCounsellingDashboardMeta, moduleName }),
  options,
);

export const generalCounsellingDashboard = getSyncLifecycle(GeneralCounsellingSummary, {
  featureName: 'general-counselling-summary',
  moduleName,
});

export const vmmcDashboardLink = getSyncLifecycle(createDashboardLink({ ...vmmcDashboardMeta, moduleName }), options);

export const vmmcDashboard = getSyncLifecycle(VmmcServices, {
  featureName: 'vmmc-services',
  moduleName,
});

export const htsDashboardLink = getSyncLifecycle(createDashboardLink({ ...htsDashboardMeta, moduleName }), options);

export const htsDashboard = getSyncLifecycle(HivTestingServices, {
  featureName: 'hiv-testing-services',
  moduleName,
});

export const treatmentRegimenDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...treatmentRegimenDashboardMeta, moduleName }),
  options,
);

export const treatmentRegimenDashboard = getSyncLifecycle(TreatmentRegimen, {
  featureName: 'treatment-regimen',
  moduleName,
});

export const familyTrackingDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...familyTrackingDashboardMeta, moduleName }),
  options,
);

export const familyTrackingDashboard = getSyncLifecycle(FamilyTrackingSummary, {
  featureName: 'family-tracking',
  moduleName,
});

export const treatmentDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...treatmentDashboardMeta, moduleName }),
  options,
);

export const treatmentDashboard = getSyncLifecycle(TreatmentSummary, { featureName: 'treatment-regimen', moduleName });

export const patientTranfersDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...patientTransfersDashboardMeta, moduleName }),
  options,
);

export const patientTransfersDashboard = getSyncLifecycle(PatientTransfersSummary, {
  featureName: 'patient-transfers',
  moduleName,
});

export const patientSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...patientSummaryDashboardMeta, moduleName }),
  options,
);

export const patientSummaryDashboard = getSyncLifecycle(PatientSummaryOverviewList, {
  featureName: 'patient-summary',
  moduleName,
});

export const dstbSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...dstbSummaryDashboardMeta, moduleName }),
  options,
);

export const dstbSummaryDashboard = getSyncLifecycle(DSTBSummary, { featureName: 'ds-tb', moduleName });

export const drtbSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...drtbSummaryDashboardMeta, moduleName }),
  options,
);

export const drtbSummaryDashboard = getSyncLifecycle(DRTBSummary, { featureName: 'dr-tb', moduleName });

export const eidSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...eidSummaryDashboardMeta, moduleName }),
  options,
);

export const eidSummaryDashboard = getSyncLifecycle(EidSummary, { featureName: 'eid-summary', moduleName });

export const clinicalPatientSummary = getSyncLifecycle(ClinicalPatientSummary, options);

export const clincialPatientSummaryTabs = getSyncLifecycle(ClinicalPatientSummaryTabs, options);

export const subjectiveFindingsSection = getSyncLifecycle(SubjectiveFindingsComponent, options);

export const objectiveFindingsSection = getSyncLifecycle(ObjectiveFindingsComponent, options);

export const treatmentPlanSection = getSyncLifecycle(TreatmentPlanComponent, options);

export const assessmentSection = getSyncLifecycle(AssessmentComponent, options);

export const appSearchLaunch = getSyncLifecycle(AppSearchLaunchComponent, options);
