import { Award, Truck, CreditCard } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Calidad Garantizada",
    description: "Productos seleccionados con los más altos estándares de calidad",
  },
  {
    icon: Truck,
    title: "Entregas Rápidas",
    description: "Envíos seguros y rápidos a todo el país",
  },
  {
    icon: CreditCard,
    title: "Pagos Fáciles",
    description: "Múltiples métodos de pago para tu comodidad",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-green-400 " />
                </div>
                <h3 className="text-xl font-bold  mb-2 ">
                  {benefit.title}
                </h3>
                <p className="">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;