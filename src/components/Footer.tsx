import Link from "next/link";

const Footer = () => {
  const current_year = new Date().getFullYear();
  return (
    <div
      id="section_footer"
      style={{
        backgroundColor: "#FFFFF",
        padding: "20px",
        marginBottom: "-70px",
      }}
    >
      <div className="text-center" style={{ fontSize: "19px" }}>
        <Link href="/privacy-policy" passHref>
          Privacy
        </Link>
        <span style={{ margin: "0 8px" }}>|</span>
        <Link href="/terms-and-conditions" passHref>
          Terms
        </Link>
        <span style={{ margin: "0 8px" }}>|</span>
        <Link href="mailto:evalurez@gmail.com" className="btn btn-link">
          Contact
        </Link>
        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Copyright © {current_year}, Evalurez LLC. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
