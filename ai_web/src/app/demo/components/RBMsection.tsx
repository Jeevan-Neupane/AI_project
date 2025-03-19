import Image from "next/image";

export default function RBMSection() {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">What is a Restricted Boltzmann Machine?</h2>
      <p className="text-green-800">
        A Restricted Boltzmann Machine (RBM) is a simplified version of the Boltzmann Machine where connections exist only between layers (no intra-layer connections).
        It is commonly used for dimensionality reduction, classification, and generative models.
      </p>

      <div className="flex justify-center my-4">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Restricted_Boltzmann_machine.svg/1920px-Restricted_Boltzmann_machine.svg.png" alt="RBM Architecture" width={500} height={300} />
      </div>

      <p className="text-green-800">
        RBMs have a visible layer and a hidden layer, and they learn by adjusting the weights through a contrastive divergence algorithm.
        They are widely used in recommendation systems, image reconstruction, and feature extraction.
      </p>
    </section>
  );
}
