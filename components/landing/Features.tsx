import { features } from "@/data/features";

export default function Features() {
  return (
    <section id="features" className="container-main py-24">
      <div className="mx-auto max-w-2xl text-center" data-aos="fade-up" suppressHydrationWarning>
        <p className="text-sm font-semibold text-violet-400">
          FEATURES
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to manage{" "}
          <span className="text-gradient">your links</span>
        </h2>

        <p className="mt-5 text-zinc-400">
          Simple tools to create, organize, and understand your short links.
        </p>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3" data-aos="fade-up"
        data-aos-delay="100" suppressHydrationWarning>
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="glass-card rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30"
            >
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                <Icon size={23} />
              </span>

              <h3 className="text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {feature.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
