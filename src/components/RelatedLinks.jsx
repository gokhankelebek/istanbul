import { Link } from 'react-router-dom';

export default function RelatedLinks({ links }) {
  if (!links || links.length === 0) return null;

  return (
    <section className="py-12 border-t mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Explore More Middle Eastern Classics</h2>
        <p className="text-gray-600 mt-2">Discover more rich traditions and flavors with our curated guides.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {links.map((link, index) => (
          <div key={index} className="flex flex-col items-start">
            <Link
              to={link.to}
              className="text-xl font-semibold hover:text-saffron transition mb-2"
            >
              {link.title}
            </Link>
            <p className="text-gray-500 text-sm">{link.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
