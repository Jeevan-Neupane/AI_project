export default function ProjectIntro() {
    return (
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">Project Introduction</h2>
        <p className="text-green-800">
          In this project, we use a **Restricted Boltzmann Machine (RBM)** to learn patterns from the **MNIST dataset** and 
          reconstruct images. We also classify them using a **Support Vector Machine (SVM)**.
        </p>
        <p className="text-green-800 mt-4">
          The RBM learns an unsupervised representation of digit images, reducing the dimensionality 
          and extracting meaningful features. Using these features, we train an SVM for classification.
        </p>
      </section>
    );
  }
  