import React from "react";
import { Box, H1, H2, H3, Text, Button } from "@adminjs/design-system";

interface DashboardData {
  totalLandlords: number;
  totalLodgings: number;
  totalAdmins: number;
  recentLandlords: number;
  recentLodgings: number;
  averagePrice: number;
  topLocations: { location: string; count: number }[];
  topAmenities: { amenity: string; count: number }[];
}

interface DashboardProps {
  data?: DashboardData;
}

const Dashboard: React.FC<any> = (props) => {
  console.log("All Dashboard props:", props);
  console.log("Props keys:", Object.keys(props));

  // AdminJS kann Daten in verschiedenen Formen übergeben
  let serverData = null;

  // Versuche verschiedene Möglichkeiten, die Daten zu finden
  if (props.data) {
    serverData = props.data;
    console.log("Found data in props.data:", serverData);
  } else if (props.record) {
    serverData = props.record;
    console.log("Found data in props.record:", serverData);
  } else if (props.resource) {
    serverData = props.resource;
    console.log("Found data in props.resource:", serverData);
  } else if (props.currentAdmin) {
    console.log("Found currentAdmin:", props.currentAdmin);
  }

  // Prüfe alle Props auf Dashboard-ähnliche Daten
  Object.keys(props).forEach((key) => {
    const value = props[key];
    if (
      value &&
      typeof value === "object" &&
      (value.totalLandlords !== undefined ||
        value.totalLodgings !== undefined ||
        value.data !== undefined)
    ) {
      console.log(`Found potential dashboard data in ${key}:`, value);
      serverData = value.data || value;
    }
  });

  console.log("Final serverData:", serverData);

  // Nutze Server-Daten oder lade sie dynamisch
  const [dashboardData, setDashboardData] = React.useState(serverData);

  // Lade Daten dynamisch falls nicht über Props verfügbar
  React.useEffect(() => {
    if (!serverData) {
      console.log(
        "No server data found, trying to fetch from /admin/api/dashboard",
      );
      // Versuche, die Daten direkt zu fetchen
      fetch("/admin/api/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Fetched dashboard data:", result);
          if (result.data) {
            setDashboardData(result.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
        });
    }
  }, [serverData]);

  if (!dashboardData) {
    return (
      <Box p="xl">
        <H1>🏠 Innovastay Dashboard</H1>
        <Text>Lade Dashboard-Daten...</Text>
        <Text fontSize="sm" color="grey60">
          Schauen Sie in die Browser-Konsole für Debug-Informationen
        </Text>
      </Box>
    );
  }

  const {
    totalLandlords = 0,
    totalLodgings = 0,
    totalAdmins = 0,
    recentLandlords = 0,
    recentLodgings = 0,
    averagePrice = 0,
    topLocations = [],
    topAmenities = [],
  } = dashboardData;

  return (
    <Box p="xl">
      {/* Header */}
      <Box mb="xl">
        <H1>🏠 Innovastay Dashboard</H1>
        <Text>
          Hier finden Sie alle wichtigen Statistiken und Analysen Ihrer
          Plattform
        </Text>
      </Box>

      {/* Main Statistics */}
      <Box mb="xl">
        <H2 mb="lg">Hauptstatistiken</H2>
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
          }}
        >
          <Box
            p="lg"
            bg="white"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Box style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.3, fontSize: "24px" }}>
              👥
            </Box>
            <H3 color="primary">{totalLandlords.toLocaleString()}</H3>
            <Text fontWeight="bold">Gesamte Vermieter</Text>
            <Text fontSize="sm">{recentLandlords} neue in 30 Tagen</Text>
          </Box>

          <Box
            p="lg"
            bg="white"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Box style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.3, fontSize: "24px" }}>
              🏢
            </Box>
            <H3 color="success">{totalLodgings.toLocaleString()}</H3>
            <Text fontWeight="bold">Gesamte Unterkünfte</Text>
            <Text fontSize="sm">{recentLodgings} neue in 30 Tagen</Text>
          </Box>

          <Box
            p="lg"
            bg="white"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Box style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.3, fontSize: "24px" }}>
              💰
            </Box>
            <H3 color="warning">€{averagePrice.toLocaleString()}</H3>
            <Text fontWeight="bold">Durchschnittspreis</Text>
            <Text fontSize="sm">pro Nacht</Text>
          </Box>

          <Box
            p="lg"
            bg="white"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <Box style={{ position: "absolute", top: "16px", right: "16px", opacity: 0.3, fontSize: "24px" }}>
              🛡️
            </Box>
            <H3 color="danger">{totalAdmins}</H3>
            <Text fontWeight="bold">Administratoren</Text>
            <Text fontSize="sm">aktive Benutzer</Text>
          </Box>
        </Box>
      </Box>

      {/* Top Locations */}
      {topLocations.length > 0 && (
        <Box mb="xl">
          <H2 mb="lg">📍 Top Standorte</H2>
          <Box
            p="lg"
            bg="white"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            {topLocations.map((location, index) => {
              const percentage =
                totalLodgings > 0
                  ? Math.round((location.count / totalLodgings) * 100)
                  : 0;
              return (
                <Box
                  key={index}
                  p="sm"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom:
                      index < topLocations.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                  }}
                >
                  <Text fontWeight="bold">{location.location}</Text>
                  <Box style={{ display: "flex", gap: "16px" }}>
                    <Text>{location.count} Unterkünfte</Text>
                    <Text color="primary">{percentage}%</Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Top Amenities */}
      {topAmenities.length > 0 && (
        <Box mb="xl">
          <H2 mb="lg">⭐ Beliebteste Ausstattungen</H2>
          <Box
            p="lg"
            bg="white"
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            {topAmenities.map((amenity, index) => {
              const percentage =
                totalLodgings > 0
                  ? Math.round((amenity.count / totalLodgings) * 100)
                  : 0;
              return (
                <Box
                  key={index}
                  p="sm"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom:
                      index < topAmenities.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                  }}
                >
                  <Text fontWeight="bold">{amenity.amenity}</Text>
                  <Box style={{ display: "flex", gap: "16px" }}>
                    <Text>{amenity.count}x vorhanden</Text>
                    <Text color="success">{percentage}%</Text>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

      {/* Footer */}
      <Box textAlign="center" color="grey60" fontSize="sm">
        <Text>
          Dashboard zuletzt aktualisiert: {new Date().toLocaleString("de-DE")}
        </Text>
      </Box>
    </Box>
  );
};

export default Dashboard;
