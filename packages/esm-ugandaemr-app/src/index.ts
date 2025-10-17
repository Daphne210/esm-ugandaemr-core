import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { moduleName } from './constants';

import formBuilderAppMenu from './menu-app-items/form-builder-app-item/form-builder-app-item.component';
import systemInfoAppMenu from './menu-app-items/system-info-app-item/system-info-app-item.component';
import legacyAdminAppMenu from './menu-app-items/legacy-admin-item/legacy-admin-item.component';
import cohortBuilderAppMenu from './menu-app-items/cohort-builder-item/cohort-builder-item.component';
import formRenderTestAppMenu from './menu-app-items/form-render-test-item/form-render-test-item.component';
import dispensingAppMenu from './menu-app-items/despensing-app-menu-item/dispensing-app-menu-item.component';
import bedManagementAppMenu from './menu-app-items/bed-mgt-item/bed-mgt.component';
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

import GeneralCounsellingSummary from './views/hiv/hct/general-counselling/general-counselling-summary.component';
import PatientSummaryOverviewList from './views/hiv/hct/patient-summary/patient-summary-summary.component';
import TreatmentSummary from './views/hiv/hct/treatment/treatment-summary.component';
import HivTestingServices from './views/hiv/hps/hts/hiv-testing-services.component';
import VmmcServices from './views/hiv/hps/vmmc/vmmc-services.component';
import DSTBSummary from './views/tb/ds/ds-tb-summary.component';
import DRTBSummary from './views/tb/dr/dr-tb-summary.component';
import EidSummary from './views/eid/eid.component';
import { registerCustomDataSource } from '@openmrs/esm-form-engine-lib';
import { DSDMCategorizationDatasource } from './custom-expressions/custom-expressions';
import AppSearchLaunch from './app-menu/app-search-icon/app-search-icon.component';

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
export const bedManagementMenuItem = getSyncLifecycle(bedManagementAppMenu, options);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);

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

// Patient Chart

export const clinicalViewsDivider = getSyncLifecycle(
  createOHRIPatientChartSideNavLink(patientChartDivider_dashboardMeta),
  options,
);

export const generalCounsellingDashboard = getSyncLifecycle(GeneralCounsellingSummary, {
  featureName: 'general-counselling-summary',
  moduleName,
});

export const vmmcDashboard = getSyncLifecycle(VmmcServices, {
  featureName: 'vmmc-services',
  moduleName,
});

export const htsDashboard = getSyncLifecycle(HivTestingServices, {
  featureName: 'hiv-testing-services',
  moduleName,
});

export const treatmentDashboard = getSyncLifecycle(TreatmentSummary, { featureName: 'treatment-regimen', moduleName });

export const patientSummaryDashboard = getSyncLifecycle(PatientSummaryOverviewList, {
  featureName: 'patient-summary',
  moduleName,
});

export const dstbDashboard = getSyncLifecycle(DSTBSummary, { featureName: 'ds-tb', moduleName });

export const drtbDashboard = getSyncLifecycle(DRTBSummary, { featureName: 'dr-tb', moduleName });

export const eidDashboard = getSyncLifecycle(EidSummary, { featureName: 'eid-summary', moduleName });

export const clinicalPatientSummary = getSyncLifecycle(ClinicalPatientSummary, options);

export const clincialPatientSummaryTabs = getSyncLifecycle(ClinicalPatientSummaryTabs, options);

export const subjectiveFindingsSection = getSyncLifecycle(SubjectiveFindingsComponent, options);

export const objectiveFindingsSection = getSyncLifecycle(ObjectiveFindingsComponent, options);

export const treatmentPlanSection = getSyncLifecycle(TreatmentPlanComponent, options);

export const assessmentSection = getSyncLifecycle(AssessmentComponent, options);

export const appMenuButton = getSyncLifecycle(AppSearchLaunch, options);
