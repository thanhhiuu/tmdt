import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
const Breadcrumd = ({ productData, title, cust }) => {
  const routers = [
    { path: `/:product`, breadcrumb: productData?.title },
    { path: `/`, breadcrumb: 'Home' },
    { path: `/:product/:uid/:title`, breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routers);
  // console.log(breadcrumbs);
  return (
    <>
      {' '}
      <div className="flex flex-col uppercase text-[16px]">
        {' '}
        <div className="font-semibold">{title}</div>
        <div className="flex items-center gap-2">
          {breadcrumbs
            .filter((el, index) =>
              cust ? index !== 1 && index !== 2 : !el.match.route === false
            )
            .map(({ match, breadcrumb }, index, arr) => (
              <Link
                className="flex items-center gap-2 uppercase hover:text-colorNav"
                key={match.pathname}
                to={match.pathname}
              >
                <span>{breadcrumb}</span>
                {index < arr.length - 1 && <span>{'>'}</span>}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Breadcrumd;
