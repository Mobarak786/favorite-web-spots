
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { CheckCircle, Globe, Heart, LinkIcon, Shield } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-grid-pattern bg-green-gradient flex flex-col">
      {/* Navigation */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-spot-primary" />
            <span className="font-semibold text-xl">Web Spot</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="#features">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Features
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#benefits">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Benefits
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/auth">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 flex-grow flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
                Organize your favorite websites in one place
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Web Spot is a simple, elegant way to bookmark, organize, and quickly access all your favorite web destinations.
              </p>
              <div className="flex flex-wrap gap-4 pt-6">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/auth">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="#features">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 p-6 bg-white/70 rounded-xl shadow-xl backdrop-blur-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center p-4 shadow-sm">
                    <Globe className="w-10 h-10 text-green-600 opacity-80" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to keep your favorite websites organized and accessible
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Heart className="h-6 w-6 text-spot-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Favorites</h3>
              <p className="text-gray-600">
                Mark your most used websites as favorites for quicker access whenever you need them.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <LinkIcon className="h-6 w-6 text-spot-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">One-Click Access</h3>
              <p className="text-gray-600">
                Get to any saved website instantly with a single click, no need to remember URLs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Shield className="h-6 w-6 text-spot-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
              <p className="text-gray-600">
                Your bookmarks are securely stored and accessible from any device with your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Web Spot?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how Web Spot can transform the way you browse the internet
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-spot-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Save Time</h3>
                <p className="text-gray-600">Stop wasting time searching for websites you've visited before. With Web Spot, they're just a click away.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-spot-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Stay Organized</h3>
                <p className="text-gray-600">Easily manage your growing collection of websites with our intuitive interface.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-spot-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Access Anywhere</h3>
                <p className="text-gray-600">Your favorite websites are available on any device, anywhere you go with your account.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-spot-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Free to Use</h3>
                <p className="text-gray-600">Get started with our free plan that gives you access to all essential features.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-spot-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to organize your web world?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have simplified their online experience with Web Spot.
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link to="/auth">Get Started Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-spot-primary" />
              <span className="font-semibold">Web Spot</span>
            </div>
            <p className="text-gray-600">© {new Date().getFullYear()} Web Spots. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-gray-600 hover:text-spot-primary transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-gray-600 hover:text-spot-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
