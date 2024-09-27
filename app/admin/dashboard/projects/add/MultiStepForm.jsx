import React, { useState } from 'react';
import ProjectInfoForm from './ProjectInfoForm';
import PhasesForm from './PhasesForm';
import AssigneesForm from './AssigneesForm';
// Import other sections as needed

const MultiStepForm = ({ initialProject }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [projectData, setProjectData] = useState(initialProject);

    // Step components mapping
    const stepComponents = [
        <ProjectInfoForm projectData={projectData} setProjectData={setProjectData} />,
        <PhasesForm projectData={projectData} setProjectData={setProjectData} />,
        <AssigneesForm projectData={projectData} setProjectData={setProjectData} />,
        // Add other components as needed
    ];

    // Navigation handlers
    const goToNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, stepComponents.length - 1));
    const goToPreviousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
    const skipStep = () => goToNextStep();

    return (
        <div>
            {stepComponents[currentStep]}
            <div style={{ marginTop: '20px' }}>
                {currentStep > 0 && <button onClick={goToPreviousStep}>Back</button>}
                <button onClick={skipStep} style={{ marginLeft: '10px' }}>Skip</button>
                <button onClick={goToNextStep} style={{ marginLeft: '10px' }}>Continue</button>
            </div>
        </div>
    );
};

export default MultiStepForm;
