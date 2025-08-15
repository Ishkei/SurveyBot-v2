#!/usr/bin/env python3
"""
Universal Dual AI Launcher for All Survey Platforms
Launch any survey platform with intelligent dual AI integration
"""

import os
import sys
import asyncio
import json
from pathlib import Path
from typing import Dict, List, Optional, Any

# Add current directory to path for imports
sys.path.append(str(Path(__file__).parent))

try:
    from universal_dual_ai_integration import (
        create_platform_integration,
        CPXIntegration,
        QmeeIntegration,
        PureSpectrumIntegration
    )
    DUAL_AI_AVAILABLE = True
    print("✅ Universal Dual AI system imported successfully")
except ImportError as e:
    DUAL_AI_AVAILABLE = False
    print(f"⚠️  Dual AI import failed: {e}")

try:
    from config import Config
    CONFIG_AVAILABLE = True
    print("✅ Config imported successfully")
except ImportError:
    CONFIG_AVAILABLE = False
    print("⚠️  Config not available")


class UniversalDualAILauncher:
    """
    Universal launcher for all survey platforms with dual AI integration
    
    Features:
    - Launch any supported survey platform
    - Automatic dual AI integration
    - Platform-specific optimization
    - Unified configuration management
    - Performance monitoring
    """
    
    def __init__(self):
        self.supported_platforms = {
            'cpx': {
                'name': 'CPX Research',
                'integration_class': CPXIntegration,
                'description': 'CPX Research surveys with dual AI',
                'config_file': 'cpx_config.json',
                'question_log': 'cpx_question_log.json'
            },
            'qmee': {
                'name': 'Qmee',
                'integration_class': QmeeIntegration,
                'description': 'Qmee surveys with dual AI',
                'config_file': 'qmee_config.json',
                'question_log': 'qmee_question_log.json'
            },
            'purespectrum': {
                'name': 'PureSpectrum',
                'integration_class': PureSpectrumIntegration,
                'description': 'PureSpectrum surveys with dual AI',
                'config_file': 'purespectrum_config.json',
                'question_log': 'purespectrum_question_log.json'
            }
        }
        
        self.active_platforms = {}
        self.platform_stats = {}
        
        print("🚀 Universal Dual AI Launcher initialized")
        print(f"📋 Supported platforms: {', '.join(self.supported_platforms.keys())}")
    
    def list_platforms(self) -> None:
        """List all supported platforms with details"""
        print("\n" + "=" * 80)
        print("🌐 SUPPORTED SURVEY PLATFORMS")
        print("=" * 80)
        
        for platform_id, platform_info in self.supported_platforms.items():
            status = "🟢 Available" if DUAL_AI_AVAILABLE else "🔴 Not Available"
            print(f"\n🔗 {platform_info['name']} ({platform_id})")
            print(f"   Description: {platform_info['description']}")
            print(f"   Status: {status}")
            print(f"   Config: {platform_info['config_file']}")
            print(f"   Question Log: {platform_info['question_log']}")
        
        print("\n" + "=" * 80)
    
    def launch_platform(self, platform_id: str) -> Optional[Any]:
        """
        Launch a specific survey platform with dual AI integration
        
        Args:
            platform_id: Platform identifier (cpx, qmee, purespectrum)
        
        Returns:
            Platform integration instance or None if failed
        """
        try:
            if platform_id not in self.supported_platforms:
                print(f"❌ Platform '{platform_id}' not supported")
                return None
            
            platform_info = self.supported_platforms[platform_id]
            print(f"\n🚀 Launching {platform_info['name']} with Dual AI...")
            
            # Create platform integration
            integration = create_platform_integration(platform_info['name'])
            
            if integration:
                self.active_platforms[platform_id] = integration
                print(f"✅ {platform_info['name']} launched successfully")
                
                # Test the platform
                test_result = integration.test_system()
                if test_result["status"] == "Success":
                    print(f"✅ {platform_info['name']} AI system verified")
                else:
                    print(f"⚠️  {platform_info['name']} AI system issues detected")
                
                return integration
            else:
                print(f"❌ Failed to launch {platform_info['name']}")
                return None
                
        except Exception as e:
            print(f"❌ Error launching {platform_id}: {e}")
            return None
    
    def launch_all_platforms(self) -> Dict[str, Any]:
        """Launch all supported platforms"""
        print("\n🚀 Launching all supported platforms...")
        
        results = {}
        for platform_id in self.supported_platforms.keys():
            integration = self.launch_platform(platform_id)
            results[platform_id] = integration is not None
        
        return results
    
    def get_platform_stats(self, platform_id: str) -> Optional[Dict[str, Any]]:
        """Get statistics for a specific platform"""
        if platform_id not in self.active_platforms:
            print(f"❌ Platform '{platform_id}' not active")
            return None
        
        try:
            integration = self.active_platforms[platform_id]
            stats = integration.get_stats()
            return stats
        except Exception as e:
            print(f"❌ Error getting stats for {platform_id}: {e}")
            return None
    
    def get_all_platform_stats(self) -> Dict[str, Any]:
        """Get statistics for all active platforms"""
        print("\n📊 PLATFORM STATISTICS")
        print("=" * 60)
        
        all_stats = {}
        for platform_id, integration in self.active_platforms.items():
            try:
                stats = integration.get_stats()
                all_stats[platform_id] = stats
                
                platform_name = self.supported_platforms[platform_id]['name']
                print(f"\n🔗 {platform_name} ({platform_id})")
                print(f"   Platform: {stats.get('platform', 'Unknown')}")
                print(f"   Total Requests: {stats.get('total_requests', 0)}")
                print(f"   Gemini Usage: {stats.get('gemini_usage', 0)}")
                print(f"   OpenAI Usage: {stats.get('openai_usage', 0)}")
                print(f"   Fallback Usage: {stats.get('fallback_usage', 0)}")
                print(f"   Cache Efficiency: {stats.get('cache_efficiency', '0%')}")
                print(f"   System Status: {stats.get('system_status', 'Unknown')}")
                
            except Exception as e:
                print(f"❌ Error getting stats for {platform_id}: {e}")
                all_stats[platform_id] = {"error": str(e)}
        
        return all_stats
    
    def test_platform_question(self, platform_id: str, question: str, 
                              question_type: str = "open_ended", 
                              options: List[Dict] = None, 
                              context: str = "") -> Optional[Dict[str, Any]]:
        """
        Test answering a question on a specific platform
        
        Args:
            platform_id: Platform identifier
            question: Question text
            question_type: Type of question
            options: Available options (for multiple choice)
            context: Additional context
        
        Returns:
            Test result dictionary or None if failed
        """
        if platform_id not in self.active_platforms:
            print(f"❌ Platform '{platform_id}' not active")
            return None
        
        try:
            integration = self.active_platforms[platform_id]
            platform_name = self.supported_platforms[platform_id]['name']
            
            print(f"\n🧪 Testing question on {platform_name}...")
            print(f"   Question: {question}")
            print(f"   Type: {question_type}")
            
            # Test the question
            test_result = integration.test_question(question, question_type, options, context)
            
            if test_result:
                print(f"✅ Test successful:")
                print(f"   Response: {test_result.get('response', 'No response')}")
                print(f"   Response Time: {test_result.get('response_time', 0):.2f}s")
                print(f"   Platform: {test_result.get('platform', 'Unknown')}")
            
            return test_result
            
        except Exception as e:
            print(f"❌ Error testing question on {platform_id}: {e}")
            return None
    
    def test_all_platforms_question(self, question: str, 
                                   question_type: str = "open_ended",
                                   options: List[Dict] = None, 
                                   context: str = "") -> Dict[str, Any]:
        """Test answering a question on all active platforms"""
        print(f"\n🧪 Testing question on all platforms: {question}")
        print("=" * 60)
        
        results = {}
        for platform_id in self.active_platforms.keys():
            result = self.test_platform_question(platform_id, question, question_type, options, context)
            results[platform_id] = result
        
        return results
    
    def shutdown_platform(self, platform_id: str) -> bool:
        """Shutdown a specific platform"""
        if platform_id not in self.active_platforms:
            print(f"❌ Platform '{platform_id}' not active")
            return False
        
        try:
            del self.active_platforms[platform_id]
            platform_name = self.supported_platforms[platform_id]['name']
            print(f"✅ {platform_name} ({platform_id}) shutdown successfully")
            return True
        except Exception as e:
            print(f"❌ Error shutting down {platform_id}: {e}")
            return False
    
    def shutdown_all_platforms(self) -> None:
        """Shutdown all active platforms"""
        print("\n🛑 Shutting down all platforms...")
        
        for platform_id in list(self.active_platforms.keys()):
            self.shutdown_platform(platform_id)
        
        print("✅ All platforms shutdown")
    
    def display_status(self) -> None:
        """Display current launcher status"""
        print("\n" + "=" * 80)
        print("🚀 UNIVERSAL DUAL AI LAUNCHER STATUS")
        print("=" * 80)
        
        print(f"🤖 Dual AI System: {'✅ Available' if DUAL_AI_AVAILABLE else '❌ Not Available'}")
        print(f"📋 Supported Platforms: {len(self.supported_platforms)}")
        print(f"🚀 Active Platforms: {len(self.active_platforms)}")
        
        if self.active_platforms:
            print("\n🔗 Active Platforms:")
            for platform_id, integration in self.active_platforms.items():
                platform_name = self.supported_platforms[platform_id]['name']
                print(f"   • {platform_name} ({platform_id})")
        
        print("=" * 80)


def interactive_launcher():
    """Interactive launcher interface"""
    launcher = UniversalDualAILauncher()
    
    print("🚀 Welcome to Universal Dual AI Launcher!")
    print("=" * 60)
    
    while True:
        print("\n📋 Available Commands:")
        print("  1. list - List all supported platforms")
        print("  2. launch <platform> - Launch specific platform")
        print("  3. launch-all - Launch all platforms")
        print("  4. stats <platform> - Get platform statistics")
        print("  5. stats-all - Get all platform statistics")
        print("  6. test <platform> <question> - Test question on platform")
        print("  7. test-all <question> - Test question on all platforms")
        print("  8. status - Show launcher status")
        print("  9. shutdown <platform> - Shutdown specific platform")
        print("  10. shutdown-all - Shutdown all platforms")
        print("  11. quit - Exit launcher")
        
        try:
            command = input("\n🔧 Enter command: ").strip().lower()
            
            if command == "quit" or command == "exit":
                print("👋 Goodbye!")
                break
            
            elif command == "list":
                launcher.list_platforms()
            
            elif command.startswith("launch "):
                platform = command.split(" ", 1)[1]
                launcher.launch_platform(platform)
            
            elif command == "launch-all":
                results = launcher.launch_all_platforms()
                print(f"\n📊 Launch Results: {results}")
            
            elif command.startswith("stats "):
                platform = command.split(" ", 1)[1]
                stats = launcher.get_platform_stats(platform)
                if stats:
                    print(f"\n📊 Stats for {platform}: {json.dumps(stats, indent=2)}")
            
            elif command == "stats-all":
                launcher.get_all_platform_stats()
            
            elif command.startswith("test "):
                parts = command.split(" ", 2)
                if len(parts) >= 3:
                    platform = parts[1]
                    question = parts[2]
                    result = launcher.test_platform_question(platform, question)
                    if result:
                        print(f"\n✅ Test result: {json.dumps(result, indent=2)}")
                else:
                    print("❌ Usage: test <platform> <question>")
            
            elif command.startswith("test-all "):
                question = command.split(" ", 1)[1]
                results = launcher.test_all_platforms_question(question)
                print(f"\n📊 Test results: {json.dumps(results, indent=2)}")
            
            elif command == "status":
                launcher.display_status()
            
            elif command.startswith("shutdown "):
                platform = command.split(" ", 1)[1]
                launcher.shutdown_platform(platform)
            
            elif command == "shutdown-all":
                launcher.shutdown_all_platforms()
            
            else:
                print("❌ Unknown command. Type 'list' to see available commands.")
        
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")


def quick_test():
    """Quick test of all platforms"""
    print("🧪 Quick Test of All Platforms")
    print("=" * 60)
    
    launcher = UniversalDualAILauncher()
    
    # Launch all platforms
    print("\n🚀 Launching all platforms...")
    results = launcher.launch_all_platforms()
    
    # Test a question on all platforms
    test_question = "What is your favorite hobby?"
    print(f"\n🧪 Testing question: {test_question}")
    test_results = launcher.test_all_platforms_question(test_question)
    
    # Get statistics
    print("\n📊 Getting platform statistics...")
    launcher.get_all_platform_stats()
    
    # Display final status
    launcher.display_status()
    
    print("\n🎉 Quick test complete!")
    
    # Shutdown all platforms
    launcher.shutdown_all_platforms()


if __name__ == "__main__":
    print("🚀 Universal Dual AI Launcher for Survey Platforms")
    print("=" * 80)
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "test":
            quick_test()
        else:
            print(f"❌ Unknown argument: {sys.argv[1]}")
            print("Usage: python universal_dual_ai_launcher.py [test]")
    else:
        interactive_launcher()
    
    print("\n" + "=" * 80)
    print("🎉 Universal Dual AI Launcher Complete!")
    print("🤖 Intelligent survey automation")
    print("🌐 Multi-platform support")
    print("🚀 Gemini + OpenAI integration")
    print("=" * 80)
