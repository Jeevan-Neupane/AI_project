import Image from "next/image";

export default function BMSection() {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">What is a Boltzmann Machine?</h2>
      <p className="text-green-800">
        A Boltzmann Machine is a type of stochastic neural network that learns probability distributions over its inputs.
        It consists of a network of nodes (neurons) connected by weighted edges. The model is used in unsupervised learning
        and is known for its ability to learn deep representations.
      </p>

      <div className="flex justify-center my-4">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Boltzmannexamplev1.png" alt="Boltzmann Machine Architecture" width={500} height={300} />
      </div>

      <p className="text-green-800">
        The architecture consists of visible and hidden units, where each unit is connected to every other unit.
        The goal is to minimize the system's energy function to find an optimal distribution for the input data.
      </p>
    </section>
  );
}
